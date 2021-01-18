import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { utils } from '../../utils';
import ImageCard from '../ImageCard/ImageCard';
import ViewSingle from '../ViewSingle/ViewSingle';
import './App.css';

export interface ImageJson {
    id: string;
    author: string;
    url: string;
    download_url: string;
    height: number;
    width: number;
}

function App() {
    const [elements, setElements] = useState<ImageJson[][]>([[], []]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const location = useLocation();

    async function getImages() {
        try {
            const response = await fetch(
                'https://picsum.photos/v2/list?list=50'
            );
            const images: ImageJson[] = await response.json();
            console.log(images);
            const newElements: ImageJson[][] = [[], []];
            for (let i = 0; i < images.length; i++) {
                newElements[i % 2].push(images[i]);
            }
            setElements(newElements);
            setLoaded(true);
        } catch (error) {
            console.error('FAILED TO GET IMAGES');
            console.error(error);
        }
    }

    function findImageById(id: string): ImageJson | undefined {
        return (
            elements[0].find((image) => image.id === id) ||
            elements[1].find((image) => image.id === id)
        );
    }

    function scrollDownListener() {
        function addFrontToBack(
            imageArray: ImageJson[],
            i: number,
            elementsArray: ImageJson[][]
        ): ImageJson[] {
            const newImage = elementsArray[(i + 1) % 2][imageArray.length - 15];
            // we keep the same reference for the event listener, so we have to modify the array in place
            imageArray.push({ ...newImage, id: newImage.id + 'x' });
            return imageArray;
        }

        const maxHeight = $('#root').height()! - $(window).height()!;
        const scrollTop = $(window).scrollTop()!;

        if (elements[0].length && scrollTop >= maxHeight - 400) {
            const newElements = elements.map(addFrontToBack);
            setElements(newElements);
        }
    }

    function getImageCard(image: ImageJson) {
        return (
            <Link key={image.id + 'l'} to={image.id}>
                <ImageCard
                    key={image.id}
                    imgSrc={image.download_url}
                    description={image.author}
                    url={utils.normalizeUrl(image.url)}
                />
            </Link>
        );
    }

    useEffect(() => {
        getImages();
    }, []);

    useEffect(() => {
        if (loaded) {
            window.addEventListener('scroll', () => {
                scrollDownListener();
            });
        }
        // this depends on elements, but it doesn't need to keep in
        // sync, since it only adds a scroll listener on load.
        //
        // eslint-disable-next-line
    }, [loaded]);

    return (
        <div className="app">
            <ViewSingle image={findImageById(location.pathname.slice(1))} />
            <div className="row">
                <div className="column">
                    {elements[0].map((image) => getImageCard(image))}
                </div>
                <div className="column">
                    {elements[1].map((image) => getImageCard(image))}
                </div>
            </div>
        </div>
    );
}

export default App;

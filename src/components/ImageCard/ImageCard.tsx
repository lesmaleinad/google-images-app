import './ImageCard.css';

interface Props {
    imgSrc: string;
    description: string;
    url: string;
}

function ImageCard({
    imgSrc = '',
    description = '',
    url = '',
}: Partial<Props>) {
    return (
        <div className="image-card">
            <img
                loading="lazy"
                src={
                    imgSrc ||
                    'https://miro.medium.com/max/1024/1*Pzwe6jKF3Wb4fRHXPdZXyw.png'
                }
                alt="deno"
            />
            <div className="body">
                <div className="description">{description}</div>
                <span>{url}</span>
            </div>
        </div>
    );
}

export default ImageCard;

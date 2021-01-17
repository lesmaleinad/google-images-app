import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ImageJson } from '../App/App';
import { GrClose } from 'react-icons/gr';
import './ViewSingle.css';

interface Props {
    image?: ImageJson;
}

function ViewSingle(props: Props) {
    const location = useLocation();
    const history = useHistory();
    const imageId = useRef(location.pathname);

    if (props.image && imageId.current !== location.pathname) {
        $(window).scrollTop(0);
    }

    imageId.current = location.pathname;

    function goBack() {
        history.goBack();
    }

    return (
        <div className="view-image">
            {props.image && (
                <div>
                    <GrClose className="close" onClick={goBack} />
                    <img src={props.image.download_url} alt="view single" />
                </div>
            )}
        </div>
    );
}

export default ViewSingle;

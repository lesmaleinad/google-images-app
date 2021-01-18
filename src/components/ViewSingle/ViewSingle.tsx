import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ImageJson } from '../App/App';
import { GrClose } from 'react-icons/gr';
import './ViewSingle.css';
import { utils } from '../../utils';

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
                    <div className="details">
                        <div className="top">
                            <div>
                                <div className="title">
                                    {utils.normalizeUrl(props.image.url)}
                                </div>
                                <div className="description">
                                    {props.image.author}
                                </div>
                            </div>
                            <div className="go-back-button">
                                <button onClick={goBack}>Go Back</button>
                            </div>
                        </div>
                        <div className="copyright">
                            Images may be subject to copyright.
                        </div>
                    </div>
                    <div className="hr"></div>
                    <div className="related-images">Related images</div>
                </div>
            )}
        </div>
    );
}

export default ViewSingle;

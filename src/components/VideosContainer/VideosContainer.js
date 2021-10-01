import React, { useState } from "react";
import VideosUploader from "../VideosUploader/VideosUploader";
import VideosList from "../VideosList/VideosList";
import { Container } from "react-bootstrap";

const VideosContainer = () => {
    const [videos, setVideos] = useState([]);

    const captureVideoHandler = (newVideo) => {
        setVideos(oldState => [...oldState, newVideo])
    };

    return (
        <Container className={'py-5'}>
            <VideosUploader
                onCaptureVideo={captureVideoHandler}
            />
            <VideosList videos={videos} />
        </Container>
    );
};

export default VideosContainer;
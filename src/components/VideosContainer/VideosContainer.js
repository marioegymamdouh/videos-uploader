import React, { useEffect, useState } from "react";
import VideosUploader from "../VideosUploader/VideosUploader";
import VideosList from "../VideosList/VideosList";
import { Container } from "react-bootstrap";
import { firestore } from "../../firebase/firebase";

const VideosContainer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const arr = [];
        firestore.collection('videos').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.docs.map((doc) =>
                arr.push({ id: doc.id, ...doc.data() })
            );
            setVideos(arr);
        })
    }, []);

    const captureVideoHandler = (newVideo) => {
        setVideos(oldState => [newVideo, ...oldState])
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
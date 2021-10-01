import React from "react";
import { Col, Row } from "react-bootstrap";

const VideosList = ({
    videos
}) => {
    const videosList = videos.map((elem, index) => {
        const videoURL = URL.createObjectURL(elem.video);
        const imageURL = URL.createObjectURL(elem.image);

        return (
            <Row className='justify-content-center'>
                <Col className='mb-4 col-12 col-md-9 col-lg-6'>
                    <video
                        key={index}
                        src={videoURL}
                        poster={imageURL}
                        controls
                        className='w-100'
                    />
                </Col>
            </Row>
        )
    });

    return (
        <div>{videosList}</div>
    );
};

export default VideosList;
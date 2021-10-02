import React from "react";
import { Col, Row } from "react-bootstrap";

const VideosList = ({
    videos
}) => {
    const videosList = videos.map(elem =>
        <Row className='justify-content-center' key={elem.id}>
            <Col className='mb-4 col-12 col-md-9 col-lg-6'>
                <video
                    src={elem.videoURL}
                    poster={elem.imageURL}
                    controls
                    className='w-100'
                />
            </Col>
        </Row>
    );

    return (
        <div>{videosList}</div>
    );
};

export default VideosList;
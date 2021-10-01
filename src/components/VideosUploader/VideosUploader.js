import React, { useRef, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { thumbnailCapture } from "../../utils/thumbnailCapture";

const VideosUploader = ({
    onCaptureVideo
}) => {
    const [video, setVideo] = useState();
    const inputRef = useRef();

    const clickHandler = () => {
        thumbnailCapture(video).then(image => {
            onCaptureVideo({
                video: video,
                image: image
            })
            setVideo(undefined);
            inputRef.current.value = null;
        });
    };

    return (
        <>
            <InputGroup>
                <FormControl
                    ref={inputRef}
                    type="file"
                    accept="video/mp4"
                    onChange={e => setVideo(e.target.files[0])}
                />
                <Button
                    variant="primary"
                    id="add-video"
                    className="px-5"
                    onClick={clickHandler}
                    disabled={!video}
                >
                    Capture
                </Button>
            </InputGroup>
        </>
    );
};

export default VideosUploader;
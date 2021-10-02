import React, { useRef, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { thumbnailCapture } from "../../utils/thumbnailCapture";
import { storage, firestore } from "../../firebase/firebase";

const VideosUploader = ({
    onCaptureVideo
}) => {
    const [video, setVideo] = useState();
    const [progress, setProgress] = useState(0);

    const inputRef = useRef();

    const clickHandler = () => {
        thumbnailCapture(video).then(image => {
            const id = firestore.collection('videos').doc().id;
            const time = new Date().getTime();
            const pathName = time + '-' + id;

            const imagePromise = uploadFile(image, pathName, 'image.jpg');
            const videoPromise = uploadFile(video, pathName, 'video.mp4', progressHandler);

            Promise.all([imagePromise, videoPromise]).then((values) => {
                const videoInstance = {
                    imageURL: values[0],
                    videoURL: values[1],
                    createdAt: time
                };

                firestore.collection('videos')
                    .doc(id)
                    .set(videoInstance)
                    .then(() => {
                        onCaptureVideo({id, ...videoInstance});
                        setVideo(undefined);
                        inputRef.current.value = null;
                    })
            });
        });
    };

    const progressHandler = (snapshot) => {
        const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        setProgress(percentage);
    }
    const uploadFile = (file, path, name, progress) => new Promise(((resolve, reject) => {
        const ref = storage.ref(`videos/${path}/${name}`);
        const task = ref.put(file);
        task.on(
            'state_changed',
            progress ? progress : () => {},
            (err) => reject(err),
            () => resolve(ref.getDownloadURL())
        )
    }));

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
            <progress className='w-100' value={progress} max="100">{progress + '%'}</progress>
        </>
    );
};

export default VideosUploader;
export const thumbnailCapture = (video) => {
    const videoElem = document.createElement("video");
    videoElem.src = URL.createObjectURL(video);

    videoElem.addEventListener('loadedmetadata', () => {
        videoElem.currentTime = Math.ceil(videoElem.duration / 2);
    });

    return new Promise((resolve => {
        videoElem.addEventListener('timeupdate', () => {
            let w = videoElem.videoWidth;
            let h = videoElem.videoHeight;

            let canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(videoElem, 0, 0, w, h);
            let dataURI = canvas.toDataURL('image/jpeg');

            resolve(dataURLtoFile(dataURI, `${+new Date()}.jpg`));
        });
    }))
};

export const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
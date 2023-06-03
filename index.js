const liveVideo = document.querySelector('.live-video')

const main = () => {
    faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        .then(startCam)
}

const startCam = () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(stream => {
            liveVideo.srcObject = stream

            liveVideo.addEventListener('play', processVideo)
        })
        .catch(error => {
            if (error instanceof DOMException) {
                console.log(error.name === 'NotAllowedError')
            }
        })
}

const processVideo = () => {
    faceapi.detectAllFaces(liveVideo, new faceapi.TinyFaceDetectorOptions())
        .then(detections => console.log(detections))

    requestAnimationFrame(processVideo)
}

window.addEventListener('DOMContentLoaded',main)
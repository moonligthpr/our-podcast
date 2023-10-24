const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const remoteScreen = document.getElementById('remoteScreen');
let screenSharingStream = null;

startButton.addEventListener('click', startScreenSharing);
stopButton.addEventListener('click', stopScreenSharing);

function startScreenSharing() {
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then((stream) => {
            screenSharingStream = stream;
            remoteScreen.srcObject = stream;
            // Add code for remote control functionality here
        })
        .catch((error) => {
            console.error('Error accessing screen:', error);
        });
}

function stopScreenSharing() {
    if (screenSharingStream) {
        const tracks = screenSharingStream.getTracks();
        tracks.forEach((track) => track.stop());
        remoteScreen.srcObject = null;
        screenSharingStream = null;
        // Add code for stopping remote control here
    }
}


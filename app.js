const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const track1 = document.getElementById('track1');
const track2 = document.getElementById('track2');
const playTrack1Button = document.getElementById('playTrack1');
const playTrack2Button = document.getElementById('playTrack2');
const stopTrack1Button = document.getElementById('stopTrack1');
const stopTrack2Button = document.getElementById('stopTrack2');
let audioSource1, audioSource2;

track1.addEventListener('change', (event) => {
    loadAudio(event.target.files[0], 1);
});

track2.addEventListener('change', (event) => {
    loadAudio(event.target.files[0], 2);
});

function loadAudio(file, trackNumber) {
    const reader = new FileReader();
    reader.onload = async (event) => {
        const audioBuffer = await audioContext.decodeAudioData(event.target.result);
        if (trackNumber === 1) {
            audioSource1 = audioContext.createBufferSource();
            audioSource1.buffer = audioBuffer;
        } else {
            audioSource2 = audioContext.createBufferSource();
            audioSource2.buffer = audioBuffer;
        }
    };
    reader.readAsArrayBuffer(file);
}

playTrack1Button.addEventListener('click', () => {
    if (audioSource1) {
        audioSource1.connect(audioContext.destination);
        audioSource1.start(0);
    }
});

playTrack2Button.addEventListener('click', () => {
    if (audioSource2) {
        audioSource2.connect(audioContext.destination);
        audioSource2.start(0);
    }
});

stopTrack1Button.addEventListener('click', () => {
    if (audioSource1) {
        audioSource1.stop();
        audioSource1.disconnect(audioContext.destination);
    }
});

stopTrack2Button.addEventListener('click', () => {
    if (audioSource2) {
        audioSource2.stop();
        audioSource2.disconnect(audioContext.destination);
    }
});



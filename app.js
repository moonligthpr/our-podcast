const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const track1 = document.getElementById('track1');
const track2 = document.getElementById('track2');
const playTrack1Button = document.getElementById('playTrack1');
const playTrack2Button = document.getElementById('playTrack2');
const crossfadeSlider = document.getElementById('crossfade');
let audioBuffer1, audioBuffer2;
let source1, source2;

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
            audioBuffer1 = audioBuffer;
        } else {
            audioBuffer2 = audioBuffer;
        }
    };
    reader.readAsArrayBuffer(file);
}

playTrack1Button.addEventListener('click', () => {
    if (audioBuffer1) {
        source1 = audioContext.createBufferSource();
        source1.buffer = audioBuffer1;
        source1.connect(audioContext.destination);
        source1.start(0);
    }
});

playTrack2Button.addEventListener('click', () => {
    if (audioBuffer2) {
        source2 = audioContext.createBufferSource();
        source2.buffer = audioBuffer2;
        source2.connect(audioContext.destination);
        source2.start(0);
    }
});

crossfadeSlider.addEventListener('input', () => {
    const crossfadeValue = crossfadeSlider.value;
    if (source1 && source2) {
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();

        source1.connect(gain1);
        source2.connect(gain2);

        gain1.gain.value = 1 - crossfadeValue;
        gain2.gain.value = crossfadeValue;

        gain1.connect(audioContext.destination);
        gain2.connect(audioContext.destination);

        source1.stop();
        source2.stop();
    }
});




/**
 * QUANTUM CORE V3.0 - AUDIO MODULE
 * Sound Effects, Speech Recognition, Voice Output
 */

let audioCtx = null;
let analyser = null;
let audioDataArray = null;

// --- SOUND EFFECTS ---
function playSound(freq, type, duration, vol) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playRelayClick() {
    playSound(1500, 'square', 0.02, 0.02);
    setTimeout(() => playSound(2000, 'square', 0.01, 0.015), 30);
}

function playLeapSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 2);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 2);
}

// --- AUDIO VOLUME ANALYSIS ---
function getAudioVolume() {
    if (!analyser || !audioDataArray) return 0;
    analyser.getByteFrequencyData(audioDataArray);
    let sum = 0;
    for (let i = 0; i < audioDataArray.length; i++) {
        sum += audioDataArray[i];
    }
    return sum / audioDataArray.length;
}

// --- SPEECH SYNTHESIS ---
function speakResponse(text) {
    if (!window.speechSynthesis) return;

    const cleanText = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/[#*_~]/g, '')
        .substring(0, 500);

    if (!cleanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = 1.0;
    utterance.pitch = 0.9;

    utterance.onstart = () => {
        document.body.classList.add('speaking-active');
    };

    utterance.onend = () => {
        document.body.classList.remove('speaking-active');
    };

    speechSynthesis.speak(utterance);
}

// --- SPEECH RECOGNITION ---
let recognition = null;
let isListening = false;

function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech Recognition not supported');
        return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;

    return recognition;
}

function toggleListen() {
    const micBtn = document.getElementById('mic-btn');

    if (isListening) {
        recognition?.stop();
        isListening = false;
        micBtn?.classList.remove('listening');
        return;
    }

    if (!recognition) {
        recognition = initSpeechRecognition();
    }

    if (!recognition) {
        console.error('Speech Recognition not available');
        return;
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('user-input');
        if (input) {
            input.value = transcript;
            input.dispatchEvent(new Event('input'));
        }
    };

    recognition.onend = () => {
        isListening = false;
        micBtn?.classList.remove('listening');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        micBtn?.classList.remove('listening');
    };

    try {
        recognition.start();
        isListening = true;
        micBtn?.classList.add('listening');
        playSound(800, 'sine', 0.1, 0.05);
    } catch (e) {
        console.error('Failed to start recognition:', e);
    }
}

// Export for global access
window.playSound = playSound;
window.playRelayClick = playRelayClick;
window.playLeapSound = playLeapSound;
window.speakResponse = speakResponse;
window.toggleListen = toggleListen;
window.getAudioVolume = getAudioVolume;

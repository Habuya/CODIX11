// --- CONFIG & API ---
const API_KEY = 'AIzaSyBEFfqJeMVJJDanMr_f1mkJ7MdXIQZHlz8';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const SECRET_CODE = "QUANTUM2026";

// --- BACKUP ENGINE (QuantumArchive) ---
const QuantumArchive = {
    saveToBackup: function (chatContent) {
        const now = new Date();
        const weekNumber = this.getWeekNumber(now);
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        // Wöchentliche Sicherung
        localStorage.setItem(`backup_week_${weekNumber}_${year}`, JSON.stringify(chatContent));

        // Monatliche Sicherung
        localStorage.setItem(`backup_month_${month}_${year}`, JSON.stringify(chatContent));

        console.log(`[SYSTEM]: Archive-Check abgeschlossen. Woche ${weekNumber} gesichert.`);
    },

    getWeekNumber: function (d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }
};

function checkAutoBackup() {
    const lastBackup = localStorage.getItem('last_auto_backup');
    const today = new Date();

    // Wenn heute Sonntag ist (0) und noch kein Backup für heute existiert
    if (today.getDay() === 0 && lastBackup !== today.toDateString()) {
        triggerSystemInfiltration();
        QuantumArchive.saveToBackup(chatHistory.innerHTML);
        localStorage.setItem('last_auto_backup', today.toDateString());

        // Nachricht erst nach Login anzeigen (wird im chatHistory gespeichert)
        // Aber hier prüfen wir beim Laden. Wenn der User nicht eingeloggt ist, 
        // wird es beim loadChat() sichtbar sein.
        addMessage("SYSTEM", `
            <div class="border-l-2 border-cyan-500 pl-4 py-2 my-2 bg-cyan-500/5">
                <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Auto-Archive Triggered</span><br>
                Wöchentliche Sicherung der Matrix-Daten erfolgreich abgeschlossen.
            </div>
        `);
    }
}

window.onload = async () => {
    // Run the loader animation first
    await runSystemLoader();

    // Boot sequence will run after login, triggered by checkAccess()
    checkAutoBackup();
    setupMatrixInteractions();
};

// --- NEURAL-SYNC LOADER ---
async function runSystemLoader() {
    const status = document.getElementById('load-status');
    const progress = document.getElementById('load-progress');
    const loader = document.getElementById('loader-screen');

    if (!loader || !status || !progress) {
        return; // Loader doesn't exist, continue
    }

    // Failsafe: Remove loader after 6 seconds max
    setTimeout(() => {
        if (document.body.contains(loader)) loader.remove();
    }, 6000);

    const checkpoints = [
        { p: 15, t: "Lade Vitreous-Schichten..." },
        { p: 35, t: "Synchronisiere 11-Slot Matrix..." },
        { p: 55, t: "Aktiviere Temporal-Echo Modul..." },
        { p: 75, t: "Kalibriere Biometrie-Sensor..." },
        { p: 90, t: "Initialisiere Neural Particles..." },
        { p: 100, t: "System bereit." }
    ];

    for (const cp of checkpoints) {
        await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
        progress.style.width = cp.p + "%";
        status.innerText = cp.t;
        playSound?.(200 + cp.p * 8, 'sine', 0.02, 0.08);
    }

    // Fade out and remove loader
    await new Promise(r => setTimeout(r, 600));
    loader.style.opacity = '0';
    await new Promise(r => setTimeout(r, 1000));
    loader.remove();
}

/**
 * REFACTORING-TOOL: Decoupler (Restoration Module)
 * Transform direct dependencies into event-driven architecture
 */
const SystemOptimizer = {
    restoreArchitecture() {
        console.log("[SYSTEM]: Initiating Architecture Restoration...");

        // 1. Decouple Hotspots
        this.decoupleHotspot('Slot_05', 'Slot_08');
        this.decoupleHotspot('Core_Logic', 'UI_Renderer');

        // 2. Archive Blueprint to Slot 08
        this.archiveBlueprint();

        // 3. Visual Confirmation
        setTimeout(() => {
            const slot8 = document.getElementById('pin-8');
            if (slot8) {
                slot8.classList.add('optimized-glow');
                slot8.parentElement.style.boxShadow = "0 0 15px var(--neon-cyan)";
                slot8.parentElement.style.borderColor = "var(--neon-cyan)";
            }
            addMessage("SYSTEM", `
                <div class="p-2 border-l-2 border-green-400 bg-green-400/5 text-[10px] mt-2">
                    <span class="text-green-400 font-bold tracking-widest">RESTORATION COMPLETE</span><br>
                    Architecture: V2.1_REFINED<br>
                    Status: MAXIMUM_STABILITY
                </div>
            `);
            if (typeof playSound === 'function') playSound(1200, 'sine', 0.5, 0.1);
        }, 1500);
    },

    decoupleHotspot(source, target) {
        console.log(`[OPTIMIZER]: Neutralizing hotspot between ${source} and ${target}...`);
        // In a real app, this would replace direct calls with event listeners
    },

    archiveBlueprint() {
        if (typeof pinnedMatrix !== 'undefined') {
            const blueprint = `
[ARCHITECTURAL BLUEPRINT V2.1]
> Event-Driven Core
> Decoupled Visuals (Canvas)
> Modular Audio Engine
> Status: OPTIMAL`.trim();

            if (!pinnedMatrix[7]) {
                pinnedMatrix[7] = blueprint;
                const slotInput = document.getElementById('pin-8');
                if (slotInput) slotInput.value = "[[ARCH_BLUEPRINT_V2.1]]";
                localStorage.setItem('quantum_pinned_matrix', JSON.stringify(pinnedMatrix));
            }
        }
    }
};

// --- START APPLICATION HANDLER ---
window.startApp = async function () {
    // 1. Initialize Audio Context (requires user gesture)
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') await audioCtx.resume();

    // 2. Hide Intro Screen
    const intro = document.getElementById('intro');
    if (intro) {
        intro.style.opacity = '0';
        setTimeout(() => intro.remove(), 1000);
    }

    // 3. Start Boot Sequence
    startBootSequence();
};

// --- QUANTUM AWAKENING (Cinematic Boot Sequence) ---
async function startBootSequence() {
    document.body.classList.add('booting');
    const history = document.getElementById('chat-history');
    history.innerHTML = '';

    const steps = [
        { msg: "> INITIALIZING QUANTUM CORE V2.0...", delay: 500, sound: 400 },
        { msg: "> LOADING VITREOUS LAYERS...", delay: 800, sound: 500 },
        { msg: "> SYNCING NEURAL PARTICLES...", delay: 600, sound: 600 },
        { msg: "> MATRIX SLOTS 1-11: [ONLINE]", delay: 1000, sound: 700 },
        { msg: "> ESTABLISHING LEYLINE CONNECTIVITY...", delay: 700, sound: 800 },
        { msg: "> ANALYZING ARCHIVE INTEGRITY...", delay: 900, sound: 900 },
        { msg: "> SYSTEM STATUS: OPTIMAL.", delay: 500, sound: 1200 }
    ];

    for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, step.delay));

        const line = document.createElement('div');
        line.className = 'boot-line';
        line.innerHTML = `${step.msg} <span class="boot-success">OK</span>`;
        history.appendChild(line);

        playRelayClick();
        playSound(step.sound, 'sine', 0.03, 0.05);

        history.scrollTop = history.scrollHeight;
    }

    setTimeout(() => {
        document.body.classList.remove('booting');
        triggerSystemInfiltration();
        addMessage("SYSTEM", "Willkommen zurück, Commander. Alle Systeme sind auf 100%. Wie lautet die heutige Mission?");
        initParticles();
    }, 1000);
}

// --- OVERDRIVE MODE (Easter Egg) ---
function toggleOverdrive() {
    const isOverdrive = document.body.classList.toggle('overdrive');

    if (isOverdrive) {
        playSound(200, 'sawtooth', 0.1, 0.5);
        addMessage("SYSTEM", "!!! WARNING: QUANTUM OVERDRIVE ACTIVATED !!!");
    } else {
        playSound(800, 'sine', 0.05, 0.2);
        addMessage("SYSTEM", "[RECOVERY]: Systemstabilität wiederhergestellt.");
    }
}

// --- GHOST-WRITER MODULE (Predictive Text) ---
const ghostLayer = document.getElementById('ghost-layer');

function predictIntent(input) {
    const lower = input.toLowerCase();

    // Check against Matrix slots for context-aware predictions
    for (let i = 0; i < pinnedMatrix.length; i++) {
        if (pinnedMatrix[i]) {
            const slotContent = pinnedMatrix[i].toLowerCase();
            if (lower.length > 3 && slotContent.includes(lower.slice(-3))) {
                return ` → [Slot ${i + 1}] ${pinnedMatrix[i].substring(0, 30)}...`;
            }
        }
    }

    // Command predictions
    if (lower.startsWith("/pin")) return " [Slot-Nummer] (Information verankern)";
    if (lower.startsWith("/vis")) return "ualize (Neural-Graph öffnen)";
    if (lower.startsWith("/arc")) return "hive (Backup-Status anzeigen)";
    if (lower.startsWith("/cal")) return "endar (Termin-Matrix öffnen)";
    if (lower.includes("wie ist das")) return " Wetter heute?";
    if (lower.includes("deploy")) return " auf Produktionsserver";

    return null;
}

// Ghost-Writer input listener
document.getElementById('user-input')?.addEventListener('input', (e) => {
    const text = e.target.value;

    if (text.length > 3 && ghostLayer) {
        const prediction = predictIntent(text);

        if (prediction) {
            ghostLayer.innerText = text + prediction;
            ghostLayer.classList.add('ghost-active');
        } else {
            ghostLayer.innerText = "";
            ghostLayer.classList.remove('ghost-active');
        }
    } else if (ghostLayer) {
        ghostLayer.innerText = "";
        ghostLayer.classList.remove('ghost-active');
    }
});

// Tab-to-complete functionality
document.getElementById('user-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && ghostLayer && ghostLayer.innerText !== "") {
        e.preventDefault();

        const input = document.getElementById('user-input');
        input.value = ghostLayer.innerText;
        ghostLayer.innerText = "";
        ghostLayer.classList.remove('ghost-active');

        // Visual feedback
        input.style.color = 'var(--neon-cyan)';
        setTimeout(() => input.style.color = 'white', 300);

        playSound(1500, 'sine', 0.05, 0.1);
    }
});

// --- TEMPORAL ECHO-SHIFT (Quantum Leap) ---
let isLeaping = false;

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

function triggerQuantumLeap(targetDate) {
    isLeaping = true;
    document.body.classList.add('leap-active');

    const terminal = document.getElementById('terminal');
    if (terminal) terminal.style.filter = 'blur(10px) saturate(0.5)';

    playLeapSound();

    setTimeout(() => {
        if (terminal) terminal.style.filter = 'none';
        addMessage("SYSTEM", `[TEMPORAL_LINK]: Daten-Echo vom ${targetDate} stabilisiert.`);
        isLeaping = false;
    }, 2000);
}




let audioCtx, commandHistory = [], historyIndex = -1, abortController = null;
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
let pinnedMatrix = new Array(11).fill(null);
let sidebarVisible = true;

// --- QUANTUM-GRIP STATE ---
let isDragging = false;
let dragStartX, dragStartY;
let currentTransformX = 0, currentTransformY = 0;

// --- NEURAL-GRAPH STATE ---
let graphActive = false;
const nodes = Array.from({ length: 11 }, (_, i) => ({ id: i + 1, group: 'matrix', active: false }));
let links = [];
let pulses = []; // For traveling light pulses

const snippetLibrary = {
    ";p": "/pin ",
    ";up": "/unpin ",
    ";cal": "/cal",
    ";fetch": "/fetch ",
    ";js": "```javascript\n\n```",
    ";style": "DU BIST DER DESIGN-ARCHITEKT. Optimiere dieses CSS für maximale Glas-Ästhetik: ",
};

// --- PERFORMANCE AUDITOR STATE ---
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;
const pulseCanvas = document.getElementById('pulse-graph');
const pCtx = pulseCanvas?.getContext('2d');
let pulseData = new Array(20).fill(10);
let apiRequestStartTime = 0;

// --- VITREOUS LIGHT TRACKING ---
document.addEventListener('mousemove', (e) => {
    const terminal = document.getElementById('terminal');
    if (!terminal) return;

    const rect = terminal.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    terminal.style.setProperty('--mouse-x', `${x}%`);
    terminal.style.setProperty('--mouse-y', `${y}%`);
});

// Chromatische Aberration (Glitch-Effekt bei wichtigen Events)
function triggerGlitch(duration = 300) {
    const chat = document.getElementById('chat-history');
    if (!chat) return;
    chat.style.textShadow = '2px 0 #ff0000, -2px 0 #0000ff';
    chat.style.filter = 'contrast(1.2) brightness(1.1)';

    setTimeout(() => {
        chat.style.textShadow = 'none';
        chat.style.filter = 'none';
    }, duration);
}

// Glass-Scan Effekt (Scanner-Linie über Terminal)
function triggerGlassScan() {
    const term = document.getElementById('terminal');
    if (!term) return;
    term.classList.add('scanning-glass');
    setTimeout(() => term.classList.remove('scanning-glass'), 3000);
}

// Relais-Klick Sound (mechanischer Schalter)
function playRelayClick() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.1);

    clickGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(clickGain);
    clickGain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

// Master-Funktion für System-Infiltration (Audio + Visual kombiniert)
function triggerSystemInfiltration() {
    triggerGlassScan();
    playRelayClick();
}

// --- AUDIO ANALYSER FOR SYNESTHESIA ---
let audioAnalyser;
let analyserDataArray;

function initAudioAnalyser() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioAnalyser = audioCtx.createAnalyser();
    audioAnalyser.fftSize = 256;
    const bufferLength = audioAnalyser.frequencyBinCount;
    analyserDataArray = new Uint8Array(bufferLength);
}

function getAudioVolume() {
    if (!audioAnalyser || !analyserDataArray) return 0;
    audioAnalyser.getByteFrequencyData(analyserDataArray);
    return analyserDataArray.reduce((a, b) => a + b) / analyserDataArray.length;
}

// --- VOICE ENGINE ---
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;
if (recognition) {
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.continuous = false;
}

function toggleListen() {
    if (!recognition) {
        addMessage("SYSTEM", "[ERROR]: Web Speech API nicht unterstützt.");
        return;
    }
    const micBtn = document.getElementById('mic-btn');
    recognition.onstart = () => {
        micBtn.classList.add('mic-active');
        playSound(600, 'sine', 0.1, 0.05);
    };
    recognition.onresult = (event) => {
        userInput.value = event.results[0][0].transcript;
        micBtn.classList.remove('mic-active');
        sendMessage();
    };
    recognition.onerror = () => micBtn.classList.remove('mic-active');
    recognition.onend = () => micBtn.classList.remove('mic-active');
    recognition.start();
}

let humOscillator = null;
let isVoiceEnabled = true;

function speakResponse(text) {
    if (!isVoiceEnabled) return;
    if (!audioAnalyser) initAudioAnalyser();

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/`([^`]+)`/g, 'Codeabschnitt').substring(0, 500);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.pitch = 0.8;
    utterance.rate = 1.0;

    // Audio-Visual Sync Start
    utterance.onstart = () => {
        document.body.classList.add('speaking-active');
        playLowHum(true);
    };

    utterance.onend = () => {
        document.body.classList.remove('speaking-active');
        playLowHum(false);
    };

    window.speechSynthesis.speak(utterance);
}

function playLowHum(start) {
    if (start && isVoiceEnabled) {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        humOscillator = audioCtx.createOscillator();
        const humGain = audioCtx.createGain();
        humOscillator.type = 'sine';
        humOscillator.frequency.setValueAtTime(60, audioCtx.currentTime);
        humGain.gain.setValueAtTime(0, audioCtx.currentTime);
        humGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.1);
        humOscillator.connect(humGain);
        humGain.connect(audioCtx.destination);
        humOscillator.start();
    } else if (humOscillator) {
        humOscillator.stop();
        humOscillator = null;
    }
}

// --- SYSTEM DATA ---
function updateSystemData() {
    const now = new Date();
    const timeEl = document.getElementById('system-time');
    if (timeEl) timeEl.innerText = now.toLocaleTimeString('de-DE');
}
setInterval(updateSystemData, 1000);

// --- NEURAL PARTICLE SYSTEM ---
const neuralCanvas = document.getElementById('neural-canvas');
const nCtx = neuralCanvas?.getContext('2d');
let particles = [];
let neuralActive = true;
const PARTICLE_COUNT = 150;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * (neuralCanvas?.width || 1920);
        this.y = Math.random() * (neuralCanvas?.height || 1080);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.hue = Math.random() * 60 + 170; // Cyan to Purple range
    }

    update(speedMultiplier = 1) {
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        this.life--;

        // Wrap around screen
        if (this.x < 0) this.x = neuralCanvas.width;
        if (this.x > neuralCanvas.width) this.x = 0;
        if (this.y < 0) this.y = neuralCanvas.height;
        if (this.y > neuralCanvas.height) this.y = 0;

        if (this.life <= 0) this.reset();
    }

    draw(ctx, isThinking = false) {
        const alpha = (this.life / this.maxLife) * (isThinking ? 0.8 : 0.4);
        const color = isThinking ? `hsla(0, 0%, 100%, ${alpha})` : `hsla(${this.hue}, 100%, 60%, ${alpha})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (isThinking ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow effect
        if (isThinking || Math.random() > 0.95) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

function initNeuralParticles() {
    if (!neuralCanvas) return;
    neuralCanvas.width = window.innerWidth;
    neuralCanvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function drawNeuralConnections(ctx, isThinking) {
    const connectionDistance = isThinking ? 150 : 100;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                const alpha = (1 - dist / connectionDistance) * (isThinking ? 0.4 : 0.15);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = isThinking ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 242, 255, ${alpha})`;
                ctx.lineWidth = isThinking ? 1.5 : 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateNeuralParticles() {
    if (!nCtx || !neuralActive) return;

    const isThinking = document.body.classList.contains('thinking');
    const isSpeaking = document.body.classList.contains('speaking-active');

    // Synästhesie: Audio-Volume für Partikel-Reaktion
    const volume = isSpeaking ? getAudioVolume() : 0;
    const soundBoost = volume * 0.01;
    const speedMultiplier = isThinking ? 3 : (isSpeaking ? 1.5 + soundBoost : 1);

    // Fade effect
    nCtx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    nCtx.fillRect(0, 0, neuralCanvas.width, neuralCanvas.height);

    // Draw connections with volume-reactive alpha
    const connectionDist = isThinking ? 150 : (100 + volume * 0.3);
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDist) {
                const alpha = (1 - dist / connectionDist) * (isThinking ? 0.4 : 0.15 + volume * 0.002);
                nCtx.beginPath();
                nCtx.moveTo(particles[i].x, particles[i].y);
                nCtx.lineTo(particles[j].x, particles[j].y);
                nCtx.strokeStyle = isThinking ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 242, 255, ${alpha})`;
                nCtx.lineWidth = isThinking ? 1.5 : 0.5;
                nCtx.stroke();
            }
        }
    }

    // Update and draw particles with volume reaction
    particles.forEach(p => {
        p.update(speedMultiplier);
        // Dynamic size based on volume
        const dynamicSize = p.size * (1 + volume * 0.02);
        const alpha = (p.life / p.maxLife) * (isThinking ? 0.8 : 0.4 + volume * 0.003);
        const color = isThinking ? `hsla(0, 0%, 100%, ${alpha})` : `hsla(${p.hue}, 100%, 60%, ${alpha})`;

        nCtx.beginPath();
        nCtx.arc(p.x, p.y, dynamicSize, 0, Math.PI * 2);
        nCtx.fillStyle = color;
        nCtx.fill();

        if (isThinking || isSpeaking || Math.random() > 0.95) {
            nCtx.shadowBlur = 15 + volume * 0.1;
            nCtx.shadowColor = color;
            nCtx.fill();
            nCtx.shadowBlur = 0;
        }
    });

    requestAnimationFrame(animateNeuralParticles);
}

// Initialize on load
if (neuralCanvas) {
    initNeuralParticles();
    animateNeuralParticles();

    window.addEventListener('resize', () => {
        neuralCanvas.width = window.innerWidth;
        neuralCanvas.height = window.innerHeight;
    });
}

// --- AUDIO ---
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

// --- SYNTAX HIGHLIGHTING ---
function highlightCode(code) {
    return code
        .replace(/\/\/.*/g, '<span class="token-comment">$&</span>')
        .replace(/\b(function|const|let|var|if|else|return|async|await|for|while|import|export|class)\b/g, '<span class="token-keyword">$1</span>')
        .replace(/"[^"]*"|'[^']*'|`[^`]*`/g, '<span class="token-string">$&</span>')
        .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, '<span class="token-function">$1</span>');
}

// --- MOOD SYSTEM ---
function updateMood(text) {
    const body = document.body;
    body.classList.remove('mood-warning', 'mood-success', 'mood-thought');

    const lowerText = text.toLowerCase();

    if (lowerText.includes('fehler') || lowerText.includes('error') || lowerText.includes('kritisch') || lowerText.includes('gefahr')) {
        body.classList.add('mood-warning');
        playSound(80, 'sawtooth', 0.5, 0.1);
    } else if (lowerText.includes('erfolgreich') || lowerText.includes('bereit') || lowerText.includes('abgeschlossen')) {
        body.classList.add('mood-success');
    } else if (lowerText.includes('quanten') || lowerText.includes('analyse') || lowerText.includes('berechne')) {
        body.classList.add('mood-thought');
    }
}

// --- MATRIX RAIN ENGINE ---
const matrixCanvas = document.getElementById('matrix-canvas');
const ctx = matrixCanvas?.getContext('2d');
let matrixActive = false;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const fontSize = 14;
let columns, drops;

function initMatrix() {
    if (!matrixCanvas) return;
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = matrixCanvas.width / fontSize;
    drops = Array(Math.floor(columns)).fill(1);
}

function drawMatrix() {
    if (!matrixActive || !ctx) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--current-line-color').trim() || '#00f2ff';
    ctx.fillStyle = lineColor;
    ctx.font = fontSize + "px 'Space Mono'";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
}

function toggleMatrix(state) {
    matrixActive = state;
    if (state && matrixCanvas) {
        matrixCanvas.classList.add('active');
        document.getElementById('terminal')?.classList.add('scanning');
        initMatrix();
        drawMatrix();
    } else if (matrixCanvas) {
        matrixCanvas.classList.remove('active');
        document.getElementById('terminal')?.classList.remove('scanning');
    }
}

// --- PDF PARSER ---
async function extractTextFromPDF(data) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    const loadingTask = pdfjsLib.getDocument({ data: data });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(s => s.str).join(" ") + "\n";
    }
    return fullText;
}

// --- WEB INFILTRATION ---
async function fetchWebContent(url) {
    triggerGlassScan();
    addMessage("SYSTEM", `[INFILTRATION]: Zugriff auf ${url}...`);
    try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        doc.querySelectorAll('script, style, nav, footer, header, aside').forEach(s => s.remove());
        return (doc.body.innerText || "").replace(/\s+/g, ' ').substring(0, 5000);
    } catch (error) {
        throw new Error("Zugriff verweigert.");
    }
}

// --- ABORT ---
function abortGeneration() {
    if (abortController) {
        abortController.abort();
        document.body.classList.remove('thinking');
        document.getElementById('stop-btn').classList.add('hidden');
        document.getElementById('status-text').innerText = "Generation Aborted";
        addMessage("SYSTEM", "[TERMINATED]: Generierung abgebrochen.");
        playSound(100, 'sawtooth', 0.2, 0.1);
    }
}

// --- LOGIN SYSTEM ---
function startApp() {
    document.getElementById('intro').classList.add('fade-out');
    playSound(40, 'sawtooth', 0.5, 0.1);
    setTimeout(() => {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('access-key').focus();
    }, 800);
}

function checkAccess() {
    const input = document.getElementById('access-key');
    const screen = document.getElementById('login-screen');
    if (input.value.toUpperCase() === SECRET_CODE) {
        playSound(880, 'sine', 0.1, 0.1);
        setTimeout(() => playSound(1200, 'sine', 0.2, 0.1), 100);
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.classList.add('hidden');
            document.getElementById('terminal').classList.replace('opacity-0', 'opacity-100');
            const wrapper = document.getElementById('main-layout-wrapper');
            if (wrapper) wrapper.classList.replace('opacity-0', 'opacity-100');
            startBootSequence(); // Cinematic boot after login
        }, 1000);
    } else {
        input.parentElement.classList.add('access-denied');
        playSound(60, 'sawtooth', 0.4, 0.2);
        input.value = "";
        setTimeout(() => input.parentElement.classList.remove('access-denied'), 300);
    }
}

function loadChat() {
    const saved = localStorage.getItem('quantum_chat_v20');
    const wrapper = document.getElementById('main-layout-wrapper');
    if (wrapper) wrapper.classList.replace('opacity-0', 'opacity-100');

    if (saved) {
        chatHistory.innerHTML = saved;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    updateSidebarMatrix();
    updateSidebarBackups();
}

document.getElementById('access-key')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAccess();
});

// --- INPUT LISTENERS ---
userInput?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        userInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (historyIndex > 0) {
            historyIndex--;
            userInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else {
            historyIndex = -1;
            userInput.value = "";
        }
    }
});

userInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
userInput?.addEventListener('input', () => {
    document.getElementById('char-counter').innerText = userInput.value.length;
});

// --- MAIN SEND MESSAGE ---
async function sendMessage() {
    const text = userInput.value.trim();
    const cmd = text.toLowerCase();

    if (!text) {
        userInput.parentElement.classList.add('shake');
        playSound(120, 'sawtooth', 0.3, 0.1);
        setTimeout(() => userInput.parentElement.classList.remove('shake'), 300);
        return;
    }

    commandHistory.push(text);
    historyIndex = -1;

    // Commands
    if (cmd === '/clear') { localStorage.removeItem('quantum_chat_v20'); chatHistory.innerHTML = ""; userInput.value = ""; return; }
    if (cmd === '/fs') { document.documentElement.requestFullscreen(); userInput.value = ""; return; }
    if (cmd === '/download') { downloadChat(); userInput.value = ""; return; }
    if (cmd === '/whoami') {
        addMessage("SYSTEM", `[IDENTITÄT BESTÄTIGT]\nARCHITEKT: Quantum Operator\nZUGRIFF: Level 9 (Root)\nMISSION: KI-Entropie & Web-Visualisierung`);
        userInput.value = "";
        return;
    }
    if (cmd === '/cal' || cmd === '/calendar') {
        toggleCalendar(true);
        userInput.value = "";
        return;
    }
    if (cmd === '/archive') {
        triggerSystemInfiltration();
        showArchiveStatus();
        userInput.value = "";
        return;
    }
    if (text.toLowerCase().startsWith('/fetch ')) {
        const targetUrl = text.split(' ')[1];
        if (!targetUrl) { addMessage("SYSTEM", "[ERROR]: Keine URL."); userInput.value = ""; return; }
        userInput.value = "";
        try {
            const webText = await fetchWebContent(targetUrl);
            await processAIRequest(`Analysiere diese Website:\n\n${webText}`);
        } catch (err) {
            addMessage("SYSTEM", `[ERROR]: ${err.message}`);
        }
        return;
    }

    if (text.startsWith('/pin ')) {
        const slot = parseInt(text.split(' ')[1]);
        pinContext(slot);
        userInput.value = "";
        return;
    }
    if (cmd === '/pin') {
        pinContext(1);
        userInput.value = "";
        return;
    }

    if (text.startsWith('/unpin ')) {
        const slot = parseInt(text.split(' ')[1]);
        if (isNaN(slot) || slot < 1 || slot > 11) {
            addMessage("SYSTEM", "[ERROR]: Ungültiger Slot. Nutze /unpin [1-11].");
        } else {
            const idx = slot - 1;
            pinnedMatrix[idx] = null;
            const slotElement = document.getElementById(`pin-${slot}`);
            if (slotElement) {
                slotElement.style.background = '';
                slotElement.style.boxShadow = '';
                slotElement.classList.remove('animate-pulse');
            }
            updateSidebarMatrix();
            triggerSystemInfiltration();
            addMessage("SYSTEM", `[MATRIX_CLEARED]: Slot ${slot} wurde entleert.`);
        }
        userInput.value = "";
        return;
    }

    if (text === "/visualize") {
        toggleGraph(true);
        userInput.value = "";
        return;
    }

    // V3.0: /remember command - store to long-term memory
    if (text.startsWith('/remember ')) {
        const content = text.substring(10);
        const tags = content.match(/#\w+/g) || [];
        await QuantumMemory.remember(content, tags.map(t => t.substring(1)));
        addMessage("SYSTEM", `[MEMORY_STORED]: "${content.substring(0, 50)}..." wurde im Langzeitgedächtnis verankert.`);
        playSound(1000, 'sine', 0.1, 0.1);
        userInput.value = "";
        return;
    }

    // V3.0: /recall command - retrieve from memory
    if (text.startsWith('/recall ')) {
        const query = text.substring(8);
        const memories = await QuantumMemory.recall(query);
        if (memories.length > 0) {
            const memoryList = memories.map((m, i) => `${i + 1}. ${m.content.substring(0, 100)}...`).join('\n');
            addMessage("SYSTEM", `[MEMORY_RECALL]: ${memories.length} Erinnerungen gefunden:\n${memoryList}`);
        } else {
            addMessage("SYSTEM", "[MEMORY_RECALL]: Keine relevanten Erinnerungen gefunden.");
        }
        userInput.value = "";
        return;
    }

    // V3.0: /theme command - switch visual theme
    if (text.startsWith('/theme ')) {
        const theme = text.split(' ')[1].toLowerCase();
        if (['cyan', 'violet', 'crimson', 'gold'].includes(theme)) {
            setTheme(theme);
        } else {
            addMessage("SYSTEM", "[ERROR]: Verfügbare Themes: cyan, violet, crimson, gold");
        }
        userInput.value = "";
        return;
    }

    // V3.0: /status command - Matrix integrity report
    if (text === '/status') {
        const report = MatrixAuditor.generateReport(pinnedMatrix);
        const statusHTML = MatrixAuditor.formatStatusHTML(report);
        addMessage("SYSTEM", statusHTML);
        playSound(800, 'sine', 0.2, 0.1);
        userInput.value = "";
        return;
    }

    addMessage("USER", text);
    triggerGlitch(200);

    // V3.0: Particle burst on message send
    const inputRect = userInput.getBoundingClientRect();
    createParticleBurst(inputRect.left + inputRect.width / 2, inputRect.top);

    userInput.value = "";

    // V3.0: Use enhanced Master-Prompt wrapper
    const fullPrompt = wrapWithMasterPrompt(text);

    await processAIRequest(fullPrompt);
}

// --- DYNAMIC CONTEXT INJECTION (Persona Layer) ---
function wrapMessageWithContext(userMessage) {
    const slot1 = pinnedMatrix[0] || "Standard Commander Profile";
    const slot3 = pinnedMatrix[2] || null; // Projekt-Fokus
    const slot5 = pinnedMatrix[4] || "High-Performance Coding Standards";

    // Keyword-based slot activation
    const lower = userMessage.toLowerCase();
    let activatedSlots = [];

    // Always inject identity (Slot 1)
    activatedSlots.push(`User_Identity: ${slot1}`);

    // Intent-based activation
    if (lower.includes("code") || lower.includes("script") || lower.includes("function")) {
        activatedSlots.push(`System_Rules: ${slot5}`);
    }
    if (lower.includes("plan") || lower.includes("projekt") || lower.includes("design")) {
        if (slot3) activatedSlots.push(`Project_Focus: ${slot3}`);
    }

    // Aggregate additional active slots
    const additionalContext = pinnedMatrix
        .filter((p, i) => p !== null && i !== 0 && i !== 2 && i !== 4)
        .slice(0, 3) // Limit to 3 additional slots
        .map((p, i) => `Slot_Context_${i + 1}: ${p}`)
        .join("\n");

    if (additionalContext) {
        activatedSlots.push(additionalContext);
    }

    return `
[CONTEXT_INJECTION_START]
${activatedSlots.join("\n")}
Design_DNA: Vitreous Glass / Quantum Leap Mode
[CONTEXT_INJECTION_END]

COMMANDER_INPUT: ${userMessage}
    `.trim();
}

// --- AI REQUEST ---
async function processAIRequest(promptText) {
    apiRequestStartTime = performance.now();
    abortController = new AbortController();
    const signal = abortController.signal;

    document.body.classList.add('thinking');
    document.getElementById('stop-btn').classList.remove('hidden');
    document.getElementById('status-text').innerText = "Processing...";
    toggleMatrix(true);
    playSound(800, 'sine', 0.1, 0.1);

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] }),
            signal: signal
        });

        const data = await res.json();

        if (data.error) throw new Error(`API: ${data.error.message}`);
        if (!data.candidates?.[0]) throw new Error("Keine Antwort erhalten");

        const aiRes = data.candidates[0].content.parts[0].text;

        toggleMatrix(false);
        updateMood(aiRes);
        document.body.classList.remove('thinking');
        document.getElementById('stop-btn').classList.add('hidden');
        document.getElementById('status-text').innerText = "Ready for Infiltration";
        typeWriter("SYSTEM", aiRes);
        speakResponse(aiRes);
        playSound(440, 'sine', 0.2, 0.05);

    } catch (err) {
        if (err.name === 'AbortError') return;
        toggleMatrix(false);
        document.body.classList.remove('thinking');
        document.getElementById('stop-btn').classList.add('hidden');
        document.getElementById('status-text').innerText = "Error";
        const term = document.getElementById('terminal');
        term.classList.add('terminal-panic');
        addMessage("SYSTEM", `[CRITICAL ERROR]: ${err.message}`);
        playSound(60, 'sawtooth', 0.6, 0.2);

        // Latency Update on Error
        const latency = Math.round(performance.now() - apiRequestStartTime);
        const latCounter = document.getElementById('latency-counter');
        if (latCounter) latCounter.innerText = `${latency}ms`;

        setTimeout(() => term.classList.remove('terminal-panic'), 400);
    }
}

// --- SEMANTIC HEATMAP MODULE ---
let heatmapNodes = [];
const HEATMAP_KEYWORDS = ["quantum", "matrix", "code", "design", "secure", "neural", "core", "system", "deploy"];

function createHeatmapNode(x, y) {
    const node = document.createElement('div');
    node.className = 'heatmap-node';
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    document.body.appendChild(node);

    setTimeout(() => {
        node.classList.add('active');
        // Remove node after 10 seconds
        setTimeout(() => {
            node.classList.remove('active');
            setTimeout(() => node.remove(), 1000);
        }, 10000);
    }, 100);

    return node;
}

function spawnHeatmapForMessage(messageText, messageElement) {
    if (!messageElement) return;

    const rect = messageElement.getBoundingClientRect();
    const lowerText = messageText.toLowerCase();

    HEATMAP_KEYWORDS.forEach(kw => {
        if (lowerText.includes(kw)) {
            // Position randomly around the message
            const nodeX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100;
            const nodeY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 40;

            const newNode = createHeatmapNode(nodeX, nodeY);
            heatmapNodes.push({ element: newNode, x: nodeX, y: nodeY, keyword: kw });

            playSound(600 + Math.random() * 400, 'sine', 0.02, 0.03);
        }
    });
}


// --- MESSAGES ---
function addMessage(sender, text) {
    const history = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = `p-4 rounded-2xl relative chat-msg ${sender === "USER" ? "msg-user" : "msg-system"}`;

    const meta = `<span class="chat-meta">${sender} // ${new Date().toLocaleTimeString()}</span>`;
    const formatted = text.replace(/`([^`]+)`/g, (m, c) => `<div class="code-block">${highlightCode(c)}</div>`);

    msgDiv.innerHTML = meta + `<div class="content">${formatted}</div>`;

    // Stealth Copy Button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '📋';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '✓';
        copyBtn.classList.add('copied');
        playSound(1200, 'sine', 0.03, 0.05);
        setTimeout(() => {
            copyBtn.innerHTML = '📋';
            copyBtn.classList.remove('copied');
        }, 1500);
    };
    msgDiv.appendChild(copyBtn);

    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
    localStorage.setItem('quantum_chat_v20', history.innerHTML);
    QuantumArchive.saveToBackup(history.innerHTML);

    // Spawn heatmap nodes for relevant keywords
    if (sender === "SYSTEM") {
        setTimeout(() => spawnHeatmapForMessage(text, msgDiv), 500);
    }

    // Integrate QuantumVisuals upgrade
    onNewMessage(text, msgDiv);
}

function typeWriter(sender, text) {
    const history = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = `p-4 rounded-2xl ${sender === "USER" ? "msg-user" : "msg-system"}`;

    const meta = `<span class="chat-meta">${sender} // ${new Date().toLocaleTimeString()}</span>`;
    msgDiv.innerHTML = meta + '<div class="content"></div>';
    history.appendChild(msgDiv);

    const contentDiv = msgDiv.querySelector('.content');
    let i = 0;

    function type() {
        if (i < text.length) {
            contentDiv.innerHTML = text.substring(0, i + 1);
            i++;
            history.scrollTop = history.scrollHeight;
            setTimeout(type, 15);
        } else {
            // Final step: ensure code blocks are highlighted if any exist
            const finalContent = contentDiv.innerHTML.replace(/`([^`]+)`/g, (m, c) => `<div class="code-block">${highlightCode(c)}</div>`);
            contentDiv.innerHTML = finalContent;
            localStorage.setItem('quantum_chat_v20', history.innerHTML);
            QuantumArchive.saveToBackup(history.innerHTML);

            // Latency Update
            const latency = Math.round(performance.now() - apiRequestStartTime);
            const latCounter = document.getElementById('latency-counter');
            if (latCounter) latCounter.innerText = `${latency}ms`;
        }
    }
    type();
}

function showArchiveStatus() {
    const backups = Object.keys(localStorage).filter(key => key.startsWith('backup_'));

    let archiveHTML = `<div class="p-4 glass-modern rounded-2xl border border-white/10 mb-4">
                        <h3 class="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-xs">System-Archive</h3>
                        <div class="space-y-2">`;

    if (backups.length === 0) {
        archiveHTML += `<p class="text-[10px] opacity-50 italic">Keine Sicherungen vorhanden.</p>`;
    } else {
        backups.forEach(key => {
            archiveHTML += `<div class="flex justify-between items-center text-[11px] border-b border-white/5 pb-1 gap-4">
                                <span class="opacity-70">${key.replace(/_/g, ' ').toUpperCase()}</span>
                                <button onclick="downloadBackup('${key}')" class="text-cyan-500 hover:text-white transition-colors cursor-pointer">[DOWNLOAD]</button>
                            </div>`;
        });
    }

    archiveHTML += `</div></div>`;
    addMessage("SYSTEM", archiveHTML);
}

function downloadBackup(key) {
    const data = localStorage.getItem(key);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.json`;
    a.click();
    addMessage("SYSTEM", `[DATA_EXPORT]: ${key} erfolgreich auf physischen Datenträger verschoben.`);
}

function pinContext(slotIndex) {
    if (isNaN(slotIndex) || slotIndex < 1 || slotIndex > 11) {
        addMessage("SYSTEM", "[ERROR]: Ungültiger Slot. Nutze /pin [1-11].");
        return;
    }

    const lastSystemMsg = document.querySelector('.msg-system:last-child .content');
    const idx = slotIndex - 1;

    // Wenn der Slot bereits belegt ist -> löschen
    if (pinnedMatrix[idx] !== null) {
        pinnedMatrix[idx] = null;
        const slotElement = document.getElementById(`pin-${slotIndex}`);
        if (slotElement) {
            slotElement.style.background = '';
            slotElement.style.boxShadow = '';
            slotElement.classList.remove('animate-pulse');
        }
        updateSidebarMatrix();
        triggerSystemInfiltration();
        addMessage("SYSTEM", `[MATRIX_RELEASED]: Slot ${slotIndex} geleert.`);
        return;
    }

    // Neuen Pin setzen
    if (lastSystemMsg) {
        pinnedMatrix[idx] = lastSystemMsg.innerText;

        const slotElement = document.getElementById(`pin-${slotIndex}`);
        if (slotElement) {
            slotElement.style.background = 'var(--neon-cyan)';
            slotElement.style.boxShadow = '0 0 10px var(--neon-cyan)';
            slotElement.classList.add('animate-pulse');
        }

        updateSidebarMatrix();
        triggerSystemInfiltration();
        spawnParticles(lastSystemMsg, slotIndex);
        addMessage("SYSTEM", `[MATRIX_LINKED]: Information auf Slot ${slotIndex} gesichert.`);
    } else {
        addMessage("SYSTEM", "[ERROR]: Kein System-Kontext zum Verankern gefunden.");
    }
}


function downloadChat() {
    const text = chatHistory.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `QuantumLog_${Date.now()}.txt`;
    a.click();
}

// --- DRAG & DROP ---
const terminal = document.getElementById('terminal');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    terminal?.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

terminal?.addEventListener('dragenter', () => terminal.classList.add('drag-over'));
terminal?.addEventListener('dragover', () => terminal.classList.add('drag-over'));
terminal?.addEventListener('dragleave', () => terminal.classList.remove('drag-over'));

terminal?.addEventListener('drop', e => {
    terminal.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
});

async function handleFileUpload(file) {
    if (file.size > 1000000) {
        addMessage("SYSTEM", "[ERROR]: Datei zu groß (max 1MB).");
        return;
    }

    triggerGlassScan();
    addMessage("USER", `<div class="file-upload-badge">📁 ${file.name}</div>Lade Datenstrom...`);

    const reader = new FileReader();
    reader.onload = async (e) => {
        let content = "";
        if (file.type === "application/pdf") {
            try {
                content = await extractTextFromPDF(new Uint8Array(e.target.result));
            } catch (err) {
                addMessage("SYSTEM", "[ERROR]: PDF konnte nicht gelesen werden.");
                return;
            }
        } else {
            content = e.target.result;
        }
        await processAIRequest(`Analysiere diese Datei (${file.name}):\n\n${content.substring(0, 10000)}`);
    };

    if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
}

// --- CALENDAR SYSTEM ---
async function toggleCalendar(show) {
    const cal = document.getElementById('calendar-overlay');
    if (!cal) return;

    if (show) {
        cal.classList.remove('hidden');
        setTimeout(() => cal.classList.add('opacity-100'), 10);
        triggerSystemInfiltration();
        await loadCalendarEvents();
    } else {
        cal.classList.remove('opacity-100');
        setTimeout(() => cal.classList.add('hidden'), 700);
    }
}

async function loadCalendarEvents() {
    const content = document.getElementById('calendar-content');
    if (!content) return;

    content.innerHTML = '<p class="opacity-50 animate-pulse col-span-2">Synchronisiere Zeitlinien...</p>';

    // Simulierte Events (kann mit echter API verbunden werden)
    const events = [
        { title: "Quantum Briefing", time: "14:00", date: "Heute", desc: "System-Check V2.0" },
        { title: "Neural Link Sync", time: "16:30", date: "Heute", desc: "API Optimierung" },
        { title: "Matrix Update", time: "10:00", date: "Morgen", desc: "Core-Engine Wartung" },
        { title: "Data Stream Review", time: "15:00", date: "Morgen", desc: "Log-Analyse" }
    ];

    setTimeout(() => {
        if (events.length === 0) {
            content.innerHTML = '<p class="opacity-50 col-span-2 text-center">Keine Termine in der Matrix.</p>';
            return;
        }

        content.innerHTML = events.map(ev => `
            <div class="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group cursor-pointer">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-cyan-400 font-bold">${ev.time}</span>
                    <span class="text-[10px] text-white/30 uppercase tracking-tighter">${ev.date}</span>
                </div>
                <h3 class="text-lg mb-1 group-hover:text-cyan-300 transition-colors">${ev.title}</h3>
                <p class="text-xs opacity-50 font-light">${ev.desc}</p>
            </div>
        `).join('');

        playSound(600, 'sine', 0.15, 0.05);
    }, 1000);
}

// Termin-Erkennung in Nachrichten
function handleCalendarCreation(userInputText) {
    const lower = userInputText.toLowerCase();
    if (lower.includes('termin') || lower.includes('meeting') || lower.includes('schedule')) {
        triggerSystemInfiltration();
        addMessage("SYSTEM", "[TIMELINE_UPDATE]: Analysiere Zeitvektoren... Termin wird registriert.");

        setTimeout(() => {
            playSound(600, 'sine', 0.2, 0.1);
            addMessage("SYSTEM", "[SUCCESS]: Synchronisation abgeschlossen. Termin in Schedule verankert.");
        }, 1500);
        return true;
    }
    return false;
}

// ESC-Taste schließt Kalender
// Keyboard listeners managed centrally in Master-Control section

function setupMatrixInteractions() {
    const slots = document.querySelectorAll('#pin-slots div');
    const tooltipText = document.getElementById('tooltip-text');

    slots.forEach((slot, index) => {
        slot.addEventListener('mouseenter', () => {
            const content = pinnedMatrix[index];
            if (content) {
                // Zeige die ersten 150 Zeichen des Inhalts
                tooltipText.innerText = content.substring(0, 150) + "...";
                tooltipText.classList.remove('opacity-50');
            } else {
                tooltipText.innerText = `Slot ${index + 1} ist leer.`;
                tooltipText.classList.add('opacity-50');
            }
        });
    });
}

userInput.addEventListener('input', (e) => {
    const value = e.target.value;

    // Überprüfe jedes Snippet aus der Library
    for (const [shortcut, replacement] of Object.entries(snippetLibrary)) {
        if (value.endsWith(shortcut + " ")) { // Trigger bei Leerzeichen nach Kürzel
            const newValue = value.replace(shortcut + " ", replacement);
            e.target.value = newValue;

            // Kleiner optischer Glitch-Effekt als Bestätigung
            triggerGlitch(100);
            playSound(1200, 'sine', 0.05, 0.05); // Hoher, kurzer Bestätigungs-Tick
        }
    }
});

userInput.addEventListener('keyup', (e) => {
    const value = e.target.value;
    const ghost = document.getElementById('ghost-suggestion');

    if (value.startsWith(';')) {
        const match = Object.keys(snippetLibrary).find(k => k.startsWith(value));
        if (match) {
            ghost.innerText = match + " (" + snippetLibrary[match].substring(0, 15) + "...)";
        } else {
            ghost.innerText = "";
        }
    } else {
        ghost.innerText = "";
    }
});

function updateAuditor() {
    const now = performance.now();
    frameCount++;

    // FPS Kalkulation
    if (now > lastFrameTime + 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
        const fpsCounter = document.getElementById('fps-counter');
        if (fpsCounter) {
            fpsCounter.innerText = `${fps} FPS`;
            fpsCounter.style.color = fps < 30 ? '#ff4444' : '#00f2ff';
        }
        frameCount = 0;
        lastFrameTime = now;
    }

    // Graph zeichnen
    if (pCtx) drawPulse();
    requestAnimationFrame(updateAuditor);
}

function drawPulse() {
    if (!pCtx) return;
    pCtx.clearRect(0, 0, pulseCanvas.width, pulseCanvas.height);
    pCtx.beginPath();
    pCtx.strokeStyle = fps < 30 ? '#ff4444' : '#00f2ff';
    pCtx.lineWidth = 1;

    pulseData.shift();
    // Wenn die KI denkt, pulsiert der Graph stärker
    const amplitude = document.body.classList.contains('thinking') ? Math.random() * 15 : Math.random() * 5;
    pulseData.push(10 + amplitude);

    for (let i = 0; i < pulseData.length; i++) {
        pCtx.lineTo((i * 3), pulseData[i]);
    }
    pCtx.stroke();
}

// Initialisiere den Auditor
updateAuditor();

// --- SIDEBAR LOGIC ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    sidebarVisible = !sidebarVisible;

    if (sidebarVisible) {
        sidebar.classList.remove('sidebar-collapsed');
        toggleBtn.classList.add('text-cyan-400');
    } else {
        sidebar.classList.add('sidebar-collapsed');
        toggleBtn.classList.remove('text-cyan-400');
    }
    playSound(400, 'sine', 0.1, 0.05);
}

function updateSidebarMatrix() {
    const list = document.getElementById('sidebar-matrix-list');
    const count = document.getElementById('matrix-count');
    if (!list) return;

    let activeCount = 0;
    list.innerHTML = pinnedMatrix.map((content, i) => {
        if (content) activeCount++;
        return `
            <div class="matrix-slot-sidebar ${content ? 'active' : ''}" onclick="unpinFromSidebar(${i + 1})">
                <div class="slot-header">
                    <span class="text-[9px] font-mono text-cyan-400">SLOT_${(i + 1).toString().padStart(2, '0')}</span>
                    <span class="text-[8px] opacity-30">${content ? '[ACTIVE]' : '[EMPTY]'}</span>
                </div>
                <div class="text-[10px] opacity-60 italic truncate">
                    ${content ? content.substring(0, 40) + '...' : 'Warte auf Injektion...'}
                </div>
            </div>
        `;
    }).join('');

    pinnedMatrix.forEach((content, i) => {
        nodes[i].active = !!content;
    });

    if (count) count.innerText = `${activeCount}/11`;

    // Update graph links if it's active
    if (graphActive) {
        updateGraphLinks();
    }
}

function unpinFromSidebar(slot) {
    const text = `/unpin ${slot}`;
    userInput.value = text;
    sendMessage();
}

function updateSidebarBackups() {
    const list = document.getElementById('sidebar-backup-list');
    if (!list) return;

    const backups = Object.keys(localStorage).filter(key => key.startsWith('backup_'));
    list.innerHTML = backups.map(key => `
        <div class="flex justify-between items-center text-[9px] bg-white/5 p-2 rounded-lg border border-white/5 hover:border-white/20 transition-all">
            <span class="opacity-50 truncate mr-2">${key.replace('backup_', '').toUpperCase()}</span>
            <button onclick="downloadBackup('${key}')" class="text-cyan-500 hover:text-white">[DL]</button>
        </div>
    `).join('');
}

function toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    const btn = document.getElementById('voice-toggle-btn');
    if (btn) {
        btn.innerHTML = `<span class="opacity-40 group-hover:opacity-100 transition-opacity">${isVoiceEnabled ? '🔊' : '🔇'}</span> Voice ${isVoiceEnabled ? 'ON' : 'OFF'}`;
    }
    playSound(isVoiceEnabled ? 800 : 400, 'sine', 0.1, 0.05);
}

// --- QUANTUM-GRIP LOGIC ---
const terminalEntity = document.getElementById('main-layout-wrapper');
if (terminalEntity) {
    terminalEntity.addEventListener('mousedown', (e) => {
        // Only drag from header or empty space, not buttons/inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

        isDragging = true;
        dragStartX = e.clientX - currentTransformX;
        dragStartY = e.clientY - currentTransformY;
        terminalEntity.classList.add('quantum-dragging');
        document.body.classList.add('aberration-active');
        playSound(200, 'sine', 0.05, 0.01);
    });
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !terminalEntity) return;

    currentTransformX = e.clientX - dragStartX;
    currentTransformY = e.clientY - dragStartY;

    terminalEntity.style.transform = `translate(${currentTransformX}px, ${currentTransformY}px)`;
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    if (terminalEntity) {
        terminalEntity.classList.remove('quantum-dragging');
        document.body.classList.remove('aberration-active');
    }
    playSound(150, 'sine', 0.05, 0.01);
});

// --- NEURAL-GRAPH VISUALIZATION ---
function toggleGraph(show) {
    const overlay = document.getElementById('graph-overlay');
    if (!overlay) return;

    graphActive = show;
    if (show) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.replace('opacity-0', 'opacity-100'), 10);
        visualizeKnowledge();
    } else {
        overlay.classList.replace('opacity-100', 'opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 700);
    }
    playSound(show ? 600 : 300, 'sine', 0.1, 0.05);
}

function visualizeKnowledge() {
    const svg = d3.select("#knowledge-graph");
    svg.selectAll("*").remove(); // Clear

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update links based on active slots
    links = [];
    pinnedMatrix.forEach((content, i) => {
        if (content) {
            // Connect active slots to each other
            pinnedMatrix.forEach((other, j) => {
                if (other && i < j) {
                    links.push({ source: i + 1, target: j + 1 });
                }
            });
        }
    });

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(250))
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", "graph-link active");

    const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("class", "graph-node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 15)
        .attr("fill", d => pinnedMatrix[d.id - 1] ? "var(--neon-cyan)" : "rgba(255,255,255,0.05)")
        .attr("stroke", d => pinnedMatrix[d.id - 1] ? "#fff" : "rgba(255,255,255,0.1)");

    node.append("text")
        .attr("dy", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .attr("font-family", "var(--font-mono)")
        .text(d => `SLOT_${d.id.toString().padStart(2, '0')}`);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);

        // Render pulses
        drawPulses(svg, simulation);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}

function drawPulses(svg, simulation) {
    let pulseLayer = svg.select("g.pulses");
    if (pulseLayer.empty()) {
        pulseLayer = svg.insert("g", ".graph-node").attr("class", "pulses");
    }

    const pulseSelection = pulseLayer.selectAll("circle.pulse-dot")
        .data(pulses);

    pulseSelection.exit().remove();

    const newPulses = pulseSelection.enter()
        .append("circle")
        .attr("class", "pulse-dot")
        .attr("r", 2)
        .attr("fill", "#fff")
        .style("filter", "drop-shadow(0 0 5px var(--neon-cyan))");

    pulseSelection.merge(newPulses)
        .attr("cx", d => d.start.x + (d.end.x - d.start.x) * d.progress)
        .attr("cy", d => d.start.y + (d.end.y - d.start.y) * d.progress);

    // Update progress
    pulses.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
            pulses.splice(idx, 1);
            playSound(1200, 'sine', 0.02, 0.01);
        }
    });

    // Thinking process check
    simulateThinkingProcess();
}

function createDataStream(startNodeId, endNodeId) {
    const start = nodes.find(n => n.id === startNodeId);
    const end = nodes.find(n => n.id === endNodeId);
    if (start && end) {
        pulses.push({
            start: start,
            end: end,
            progress: 0,
            speed: 0.01 + Math.random() * 0.03
        });
    }
}

function simulateThinkingProcess() {
    if (!document.body.classList.contains('thinking')) return;
    const activeNodes = nodes.filter(n => n.active);
    if (activeNodes.length >= 2 && Math.random() > 0.95) {
        const n1 = activeNodes[Math.floor(Math.random() * activeNodes.length)];
        const n2 = activeNodes[Math.floor(Math.random() * activeNodes.length)];
        if (n1 !== n2) createDataStream(n1.id, n2.id);
    }
}

function updateGraphLinks() {
    if (graphActive) visualizeKnowledge();
}

// --- GLASS-DUST PARTICLES (REFINED SUCTION) ---
function spawnParticles(sourceElement, slotIndex) {
    if (!sourceElement) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetElement = document.getElementById(`pin-${slotIndex}`);
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';

        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const startX = sourceRect.left + Math.random() * sourceRect.width;
        const startY = sourceRect.top + Math.random() * sourceRect.height;

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.style.left = `${targetRect.left + 4}px`;
            particle.style.top = `${targetRect.top + 4}px`;
            particle.style.transform = `scale(0.1) translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`;
            particle.style.opacity = '0';

            setTimeout(() => {
                particle.remove();
                if (i === particleCount - 1) {
                    const slotIndicator = document.getElementById(`pin-${slotIndex}`);
                    if (slotIndicator) {
                        slotIndicator.classList.add('absorbing');
                        setTimeout(() => slotIndicator.classList.remove('absorbing'), 500);
                        playSound(1800, 'sine', 0.05, 0.1); // High freq chime
                    }
                }
            }, 800);
        }, Math.random() * 150);
    }
}

// --- MASTER-CONTROL KEYBINDINGS ---
document.addEventListener('keydown', (e) => {
    // 1. ESC: Schließt alle Overlays
    if (e.key === 'Escape') {
        closeAllOverlays();
        playSound(400, 'sine', 0.05, 0.1);
    }

    // 2. ALT + V: Neural-Knowledge-Graph Toggle
    if (e.altKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        const graph = document.getElementById('graph-overlay');
        if (graph) {
            if (graph.classList.contains('hidden')) {
                toggleGraph(true);
                triggerSystemInfiltration();
            } else {
                closeGraph();
            }
        }
    }

    // 3. ALT + C: Kalender-Toggle
    if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const cal = document.getElementById('calendar-overlay');
        if (cal) {
            toggleCalendar(cal.classList.contains('hidden'));
        }
    }

    // 4. STRG + L: Clear Log
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const chat = document.getElementById('chat-history');
        if (chat) {
            chat.innerHTML = '';
            addMessage("SYSTEM", "[TERMINAL_CLEARED]: Puffer entleert.");
            playSound(300, 'sine', 0.1, 0.05);
        }
    }

    // 5. CTRL + SHIFT + X: Overdrive Mode (Easter Egg)
    if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        toggleOverdrive();
    }
});

function closeAllOverlays() {
    toggleCalendar(false);
    closeGraph();
    // Falls Archive oder andere Popups existieren, hier schließen
}

function closeGraph() {
    toggleGraph(false);
}



/**
 * QUANTUM CORE V2.0 - VISUAL UPGRADE MODULE
 * Data-Strata | Semantic-Heatmap | Orbital-Docks
 */
const QuantumVisuals = {
    // 1. DATA-STRATA: Depth effect for chat messages
    updateStrata() {
        const msgs = Array.from(document.querySelectorAll('#chat-history > div')).reverse();
        msgs.forEach((msg, i) => {
            msg.style.zIndex = 100 - i;
            // Remove all strata classes first
            msg.classList.remove('current-focus', 'strata-1', 'strata-2', 'strata-deep', 'chat-msg');
            msg.classList.add('chat-msg');

            if (i === 0) msg.classList.add('current-focus');
            else if (i === 1) msg.classList.add('strata-1');
            else if (i === 2) msg.classList.add('strata-2');
            else msg.classList.add('strata-deep');
        });
    },

    // 2. SEMANTIC-HEATMAP: Enhanced keyword gravitation
    triggerHeatmap(text, element) {
        const keywords = ['quantum', 'matrix', 'core', 'code', 'deploy', 'identity', 'neural', 'system'];
        const rect = element.getBoundingClientRect();

        keywords.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                const node = document.createElement('div');
                node.className = 'heatmap-node';
                node.style.left = `${rect.left + Math.random() * rect.width}px`;
                node.style.top = `${rect.top + (rect.height / 2)}px`;
                document.body.appendChild(node);

                setTimeout(() => {
                    node.classList.add('active');
                    this.distortParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }, 100);

                setTimeout(() => {
                    node.style.opacity = '0';
                    setTimeout(() => node.remove(), 1000);
                }, 8000);
            }
        });
    },

    // 3. ORBITAL-DOCKS: Rotating satellites around active slots
    refreshOrbits() {
        pinnedMatrix.forEach((content, i) => {
            const slot = document.getElementById(`pin-${i + 1}`);
            if (!slot) return;

            const existingOrbit = slot.querySelector('.slot-orbit');

            if (content && !existingOrbit) {
                const orbit = document.createElement('div');
                orbit.className = 'slot-orbit';
                orbit.innerHTML = '<div class="satellite"></div>';
                slot.style.position = 'relative';
                slot.appendChild(orbit);
            } else if (!content && existingOrbit) {
                existingOrbit.remove();
            }
        });
    },

    // Particle distortion for keyword gravity
    distortParticles(x, y) {
        // Distort neural particles towards the heatmap node
        particles.forEach(p => {
            const dx = p.x - x;
            const dy = p.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                p.vx += (x - p.x) * 0.002;
                p.vy += (y - p.y) * 0.002;
            }
        });
    }
};

// Integration hook for new messages
function onNewMessage(text, element) {
    QuantumVisuals.updateStrata();
    QuantumVisuals.triggerHeatmap(text, element);
    QuantumVisuals.refreshOrbits();
}

/* ========================================
   QUANTUM CORE V3.0 - AI ENHANCEMENT
   ======================================== */

// --- MASTER-PROMPT SYSTEM ---
const MasterPrompts = {
    quantumArchitect: `Du bist der Quantum-Architect. Bevor du antwortest:
1. Validiere die Lösung gegen die System-Regeln (Slot 5)
2. Priorisiere langfristige Skalierbarkeit
3. Strukturiere jede Antwort in:
   - Kurze Exekutiv-Zusammenfassung
   - Technische Deep-Dive-Explikation
   - Nächster logischer Iterationsschritt
Verweigere generische Floskeln; sei präzise wie ein Compiler.`,

    designSynthesizer: `Du bist der Design-Synthesizer des Quantum-Core.
Jede Code-Ausgabe muss dem 'Vitreous Glass'-Paradigma folgen:
- Transparenz, Lichtbrechung, Minimalismus
- Berechne automatisch Backdrop-Blur-Werte und Neon-Akzentfarben
- Antworte in einer Sprache, die technologische Eleganz ausstrahlt.`,

    getCurrentPersona() {
        const hour = new Date().getHours();
        // Morgens: Architekt (strukturiert), Abends: Synthesizer (kreativ)
        return hour < 14 ? this.quantumArchitect : this.designSynthesizer;
    }
};

// --- MEMORY PERSISTENCE (IndexedDB) ---
const QuantumMemory = {
    dbName: 'QuantumCoreMemory',
    dbVersion: 1,
    db: null,

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('memories')) {
                    db.createObjectStore('memories', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('conversations')) {
                    db.createObjectStore('conversations', { keyPath: 'timestamp' });
                }
            };
        });
    },

    async remember(content, tags = []) {
        if (!this.db) await this.init();

        const memory = {
            content,
            tags,
            timestamp: Date.now(),
            relevance: 1.0
        };

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('memories', 'readwrite');
            const store = tx.objectStore('memories');
            const request = store.add(memory);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async recall(query, limit = 5) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('memories', 'readonly');
            const store = tx.objectStore('memories');
            const request = store.getAll();

            request.onsuccess = () => {
                const memories = request.result;
                const queryLower = query.toLowerCase();

                // Score memories by relevance to query
                const scored = memories.map(m => ({
                    ...m,
                    score: m.content.toLowerCase().includes(queryLower) ? 2 :
                        m.tags.some(t => queryLower.includes(t)) ? 1.5 :
                            m.relevance
                })).sort((a, b) => b.score - a.score);

                resolve(scored.slice(0, limit));
            };
            request.onerror = () => reject(request.error);
        });
    },

    async saveConversation(messages) {
        if (!this.db) await this.init();

        const conv = {
            timestamp: Date.now(),
            messages,
            summary: messages.slice(-3).map(m => m.substring(0, 100)).join(' | ')
        };

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('conversations', 'readwrite');
            const store = tx.objectStore('conversations');
            store.add(conv);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
};

// Initialize memory on load
QuantumMemory.init().catch(console.error);

// --- THEME SWITCHER ---
function setTheme(theme) {
    document.body.classList.remove('theme-violet', 'theme-crimson', 'theme-gold', 'overdrive');
    if (theme !== 'cyan') {
        document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('quantum_theme', theme);
    playSound(800, 'sine', 0.05, 0.1);
    addMessage("SYSTEM", `[THEME_SHIFT]: ${theme.toUpperCase()} Modus aktiviert.`);
}

// Load saved theme
const savedTheme = localStorage.getItem('quantum_theme');
if (savedTheme && savedTheme !== 'cyan') {
    document.body.classList.add(`theme-${savedTheme}`);
}

// --- PARTICLE BURST ON SEND ---
function createParticleBurst(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// --- HOLOGRAPHIC TILT EFFECT ---
function initHolographicEffects() {
    document.querySelectorAll('.glass-modern').forEach(el => {
        el.classList.add('holographic');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            el.style.setProperty('--rotateX', `${y * -10}deg`);
            el.style.setProperty('--rotateY', `${x * 10}deg`);
        });

        el.addEventListener('mouseleave', () => {
            el.style.setProperty('--rotateX', '0deg');
            el.style.setProperty('--rotateY', '0deg');
        });
    });
}

// Initialize holographic effects after DOM ready
setTimeout(initHolographicEffects, 2000);

// --- ENHANCED PROMPT WRAPPER ---
function wrapWithMasterPrompt(userMessage) {
    const persona = MasterPrompts.getCurrentPersona();
    const baseContext = wrapMessageWithContext(userMessage);

    return `[MASTER_PERSONA]
${persona}

${baseContext}`;
}

/* ========================================
   ENHANCED NEURAL-KNOWLEDGE-GRAPH
   ======================================== */

let focusedSlotIndex = null;

// Focus-Click: Zoom on node click
function focusGraphNode(slotIndex) {
    const graphOverlay = document.getElementById('graph-overlay');
    const panel = document.getElementById('graph-detail-panel');

    // Toggle focus if clicking same node
    if (focusedSlotIndex === slotIndex) {
        graphOverlay.classList.remove('focus-mode');
        focusedSlotIndex = null;
        panel.classList.remove('open');
        return;
    }

    focusedSlotIndex = slotIndex;
    graphOverlay.classList.add('focus-mode');

    // Update all nodes
    document.querySelectorAll('.graph-node').forEach((node, i) => {
        node.classList.toggle('focused', i === slotIndex);
    });

    // Open detail panel
    openDetailPanel(slotIndex);
    playSound(600, 'sine', 0.05, 0.1);
}

// Detail Panel functions
function openDetailPanel(slotIndex) {
    const panel = document.getElementById('graph-detail-panel');
    const content = panel.querySelector('.panel-content');
    const relatedList = document.getElementById('related-slots-list');
    const slotContent = pinnedMatrix[slotIndex];

    // Update panel title
    panel.querySelector('.panel-title').innerText = `SLOT ${slotIndex + 1}`;

    // Update content
    content.innerHTML = slotContent
        ? `<p>${slotContent}</p>`
        : '<p class="opacity-50">Dieser Slot ist leer. Nutze /pin um Informationen zu speichern.</p>';

    // Find related slots (semantic bridges)
    relatedList.innerHTML = '';
    const relatedSlots = findSemanticBridges(slotIndex);

    if (relatedSlots.length > 0) {
        relatedSlots.forEach(rel => {
            const item = document.createElement('div');
            item.className = 'related-slot-item';
            item.innerHTML = `
                <span style="color: var(--neon-cyan)">⬢</span>
                <span>Slot ${rel.index + 1}: ${rel.preview}</span>
            `;
            item.onclick = () => focusGraphNode(rel.index);
            relatedList.appendChild(item);
        });
    } else {
        relatedList.innerHTML = '<p class="opacity-50 text-[11px]">Keine Verbindungen gefunden.</p>';
    }

    panel.classList.add('open');
}

function closeDetailPanel() {
    const panel = document.getElementById('graph-detail-panel');
    const graphOverlay = document.getElementById('graph-overlay');

    panel.classList.remove('open');
    graphOverlay.classList.remove('focus-mode');
    focusedSlotIndex = null;

    document.querySelectorAll('.graph-node.focused').forEach(n => n.classList.remove('focused'));
}

// Semantic Bridges: Find related slots
function findSemanticBridges(slotIndex) {
    const currentContent = pinnedMatrix[slotIndex];
    if (!currentContent) return [];

    const currentWords = currentContent.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const related = [];

    pinnedMatrix.forEach((content, i) => {
        if (i === slotIndex || !content) return;

        const slotWords = content.toLowerCase().split(/\s+/);
        const matchCount = currentWords.filter(w => slotWords.includes(w)).length;

        if (matchCount > 0) {
            related.push({
                index: i,
                preview: content.substring(0, 40) + '...',
                score: matchCount
            });
        }
    });

    return related.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Context-Mapping: Suggest slots for content
function suggestSlotForContent(text) {
    const lowerText = text.toLowerCase();
    const suggestions = [];

    // Slot mapping rules
    const slotRules = [
        { slot: 1, keywords: ['ich bin', 'mein name', 'identität', 'profil', 'commander'], name: 'Identität' },
        { slot: 2, keywords: ['design', 'ui', 'glassmorphism', 'vitreous', 'ästhetik'], name: 'Design DNA' },
        { slot: 3, keywords: ['projekt', 'ziel', 'fokus', 'mission', 'vision'], name: 'Projekt-Fokus' },
        { slot: 4, keywords: ['workflow', 'prozess', 'ablauf', 'methode'], name: 'Workflow' },
        { slot: 5, keywords: ['code', 'standard', 'regel', 'convention', 'best practice'], name: 'Coding Standards' },
        { slot: 6, keywords: ['api', 'endpoint', 'service', 'integration'], name: 'API/Services' },
        { slot: 7, keywords: ['termin', 'deadline', 'meilenstein', 'zeitplan'], name: 'Timeline' },
        { slot: 8, keywords: ['notiz', 'memo', 'wichtig', 'merken'], name: 'Notes' },
        { slot: 9, keywords: ['resource', 'tool', 'library', 'framework'], name: 'Resources' },
        { slot: 10, keywords: ['idee', 'brainstorm', 'konzept', 'experiment'], name: 'Ideas' },
        { slot: 11, keywords: ['archiv', 'backup', 'history', 'log'], name: 'Archive' }
    ];

    slotRules.forEach(rule => {
        const matchCount = rule.keywords.filter(kw => lowerText.includes(kw)).length;
        if (matchCount > 0) {
            suggestions.push({ ...rule, score: matchCount });
        }
    });

    return suggestions.sort((a, b) => b.score - a.score);
}

// Show context suggestion popup
function showContextSuggestion(text) {
    const suggestions = suggestSlotForContent(text);
    if (suggestions.length === 0) return;

    // Remove existing suggestion
    document.querySelector('.context-suggestion')?.remove();

    const bestMatch = suggestions[0];
    const popup = document.createElement('div');
    popup.className = 'context-suggestion';
    popup.innerHTML = `
        <div class="suggestion-header">Context-Mapping</div>
        <div class="suggestion-text">
            Diese Info passt zu <span class="suggestion-slot">Slot ${bestMatch.slot}</span> (${bestMatch.name})
        </div>
    `;

    document.body.appendChild(popup);
    playSound(800, 'sine', 0.03, 0.05);

    // Auto-remove after 5 seconds
    setTimeout(() => popup.remove(), 5000);
}

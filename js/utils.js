/**
 * QUANTUM CORE V3.0 - UTILITIES MODULE
 * Helper Functions, Formatters, Common Operations
 */

// --- CODE HIGHLIGHTING ---
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
        playSound?.(80, 'sawtooth', 0.5, 0.1);
    } else if (lowerText.includes('erfolgreich') || lowerText.includes('bereit') || lowerText.includes('abgeschlossen')) {
        body.classList.add('mood-success');
    } else if (lowerText.includes('quanten') || lowerText.includes('analyse') || lowerText.includes('berechne')) {
        body.classList.add('mood-thought');
    }
}

// --- DATE FORMATTING ---
function formatDate(date) {
    return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function formatDateTime(date) {
    return `${formatDate(date)} ${formatTime(date)}`;
}

// --- DOM HELPERS ---
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function createElement(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
}

// --- ANIMATION HELPERS ---
function triggerGlitch(duration = 200) {
    const terminal = document.getElementById('terminal');
    if (!terminal) return;
    terminal.classList.add('glitch');
    setTimeout(() => terminal.classList.remove('glitch'), duration);
}

function triggerGlassScan() {
    const terminal = document.getElementById('terminal');
    if (!terminal) return;
    terminal.classList.add('scanning');
    setTimeout(() => terminal.classList.remove('scanning'), 1500);
}

function triggerSystemInfiltration() {
    triggerGlassScan();
    playSound?.(300, 'sine', 0.3, 0.05);
    setTimeout(() => playSound?.(500, 'sine', 0.2, 0.05), 100);
    setTimeout(() => playSound?.(800, 'sine', 0.1, 0.05), 200);
}

// --- THEME SWITCHER ---
function setTheme(theme) {
    document.body.classList.remove('theme-violet', 'theme-crimson', 'theme-gold', 'overdrive');
    if (theme !== 'cyan') {
        document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem('quantum_theme', theme);
    playSound?.(800, 'sine', 0.05, 0.1);
}

// Load saved theme
const savedTheme = localStorage.getItem('quantum_theme');
if (savedTheme && savedTheme !== 'cyan') {
    document.body.classList.add(`theme-${savedTheme}`);
}

// --- PARTICLE BURST ---
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

// Export for global access
window.highlightCode = highlightCode;
window.updateMood = updateMood;
window.formatDate = formatDate;
window.formatTime = formatTime;
window.formatDateTime = formatDateTime;
window.triggerGlitch = triggerGlitch;
window.triggerGlassScan = triggerGlassScan;
window.triggerSystemInfiltration = triggerSystemInfiltration;
window.setTheme = setTheme;
window.createParticleBurst = createParticleBurst;
window.initHolographicEffects = initHolographicEffects;

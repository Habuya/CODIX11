/**
 * QUANTUM CORE V3.0 - VISUALS MODULE
 * Neural Particles, Matrix Rain, Canvas Effects
 */

// Canvas setup
const neuralCanvas = document.getElementById('neural-canvas');
const nCtx = neuralCanvas?.getContext('2d');
let particles = [];
let neuralActive = true;
const PARTICLE_COUNT = 150;

// --- PARTICLE CLASS ---
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
        this.hue = Math.random() * 60 + 170;
    }

    update(speedMultiplier = 1) {
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        this.life--;

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

        if (isThinking || Math.random() > 0.95) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

// --- NEURAL PARTICLE FUNCTIONS ---
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

    const volume = isSpeaking && typeof getAudioVolume === 'function' ? getAudioVolume() : 0;
    const soundBoost = volume * 0.01;
    const speedMultiplier = isThinking ? 3 : (isSpeaking ? 1.5 + soundBoost : 1);

    nCtx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    nCtx.fillRect(0, 0, neuralCanvas.width, neuralCanvas.height);

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

    particles.forEach(p => {
        p.update(speedMultiplier);
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

// --- MATRIX RAIN ENGINE ---
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas?.getContext('2d');
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
    if (!matrixActive || !matrixCtx) return;

    matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--current-line-color').trim() || '#00f2ff';
    matrixCtx.fillStyle = lineColor;
    matrixCtx.font = fontSize + "px 'Space Mono'";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

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

// --- INITIALIZATION ---
function initVisuals() {
    if (neuralCanvas) {
        initNeuralParticles();
        animateNeuralParticles();

        window.addEventListener('resize', () => {
            neuralCanvas.width = window.innerWidth;
            neuralCanvas.height = window.innerHeight;
        });
    }
}

// Auto-init if DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisuals);
} else {
    initVisuals();
}

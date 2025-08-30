const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = [
    'rgba(80,120,255,0.5)',
    'rgba(160,80,255,0.5)',
    'rgba(120,255,255,0.3)'
];

function drawAxes() {
    ctx.save();
    ctx.strokeStyle = 'rgba(120,130,180,0.15)';
    ctx.lineWidth = 1;
    // X axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    // Y axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.restore();
}

function drawFormula(time, amplitude, freq, phase, color, thickness) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
        const t = (x / canvas.width) * 4 * Math.PI;
        const y = Math.sin(freq * t + phase + time) * amplitude
            + canvas.height / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
}

function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw faint axes
    drawAxes();
    // Draw animated math curves
    drawFormula(time * 0.0005, 80, 1, 0, colors[0], 2.5);
    drawFormula(time * 0.0007, 60, 2, Math.PI / 2, colors[1], 2);
    drawFormula(time * 0.0009, 40, 3, Math.PI, colors[2], 1.5);
    requestAnimationFrame(animate);
}

animate();
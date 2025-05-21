// Cambia esta fecha por la de tu aniversario (formato: año, mes-1, día)
const fechaInicio = new Date(2022, 0, 1, 0, 0, 0); // Cambia la fecha si lo deseas

function pad(n) {
    return n.toString().padStart(2, '0');
}

function animateValue(element, finalValue, label, duration = 800) {
    let startValue = 0;
    let startTime = null;
    function animateStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * finalValue);
        element.innerHTML = `${pad(value)} <small>${label}</small>`;
        if (progress < 1) {
            requestAnimationFrame(animateStep);
        } else {
            element.innerHTML = `${pad(finalValue)} <small>${label}</small>`;
        }
    }
    requestAnimationFrame(animateStep);
}

function animateDiasYTiempo(dias, horas, minutos, segundos) {
    document.getElementById('contador').innerHTML = `
        <span id="dias-anim">00 <small>días</small></span>
        <div class="flip-row">
            <div class="flip-box" id="h-anim">
                <div class="flip-number">00</div>
                <div class="flip-label">h</div>
            </div>
            <div class="flip-box" id="m-anim">
                <div class="flip-number">00</div>
                <div class="flip-label">m</div>
            </div>
            <div class="flip-box" id="s-anim">
                <div class="flip-number">00</div>
                <div class="flip-label">s</div>
            </div>
        </div>
    `;
    animateValue(document.getElementById('dias-anim'), dias, 'días', 3000);
    animateValue(document.querySelector('#h-anim .flip-number'), horas, '', 2200);
    animateValue(document.querySelector('#m-anim .flip-number'), minutos, '', 2200);
    animateValue(document.querySelector('#s-anim .flip-number'), segundos, '', 2200);
}

function actualizarContador() {
    const ahora = new Date();
    let diff = ahora - fechaInicio;
    if (diff < 0) diff = 0;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('contador').innerHTML = `
        <span>${pad(dias)} <small>días</small></span>
        <div class="flip-row">
            <div class="flip-box">
                <div class="flip-number">${pad(horas)}</div>
                <div class="flip-label">h</div>
            </div>
            <div class="flip-box">
                <div class="flip-number">${pad(minutos)}</div>
                <div class="flip-label">m</div>
            </div>
            <div class="flip-box">
                <div class="flip-number">${pad(segundos)}</div>
                <div class="flip-label">s</div>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    const ahora = new Date();
    let diff = ahora - fechaInicio;
    if (diff < 0) diff = 0;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    animateDiasYTiempo(dias, horas, minutos, segundos);

    setTimeout(() => {
        actualizarContador();
        setInterval(actualizarContador, 1000);
    }, 1300);
});
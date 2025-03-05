let pasos = parseInt(localStorage.getItem('pasos')) || 0;
let caloriasConsumidas = parseInt(localStorage.getItem('caloriasConsumidas')) || 0;
let caloriasQuemadas = parseFloat(localStorage.getItem('caloriasQuemadas')) || 0;
const pesoUsuario = parseFloat(prompt("Introduce tu peso en kg", "70")) || 70;

const pasosElemento = document.getElementById("contador-pasos");
const caloriasConsumidasElemento = document.getElementById("calorias-consumidas");
const caloriasQuemadasElemento = document.getElementById("calorias-quemadas");
const progresoPasos = document.getElementById("progreso-pasos");

function actualizarPantalla() {
    pasosElemento.textContent = `${pasos} pasos`;
    caloriasConsumidasElemento.textContent = `${caloriasConsumidas} kcal`;
    caloriasQuemadasElemento.textContent = `${caloriasQuemadas.toFixed(2)} kcal`;
    progresoPasos.value = pasos;

    localStorage.setItem('pasos', pasos);
    localStorage.setItem('caloriasConsumidas', caloriasConsumidas);
    localStorage.setItem('caloriasQuemadas', caloriasQuemadas);
}

document.getElementById("agregar-comida").addEventListener("click", () => {
    const calorias = parseInt(prompt("¿Cuántas calorías consumiste?"), 10);
    if (!isNaN(calorias) && calorias > 0) {
        caloriasConsumidas += calorias;
        actualizarPantalla();
    }
});

document.getElementById("reiniciar").addEventListener("click", () => {
    pasos = 0;
    caloriasConsumidas = 0;
    caloriasQuemadas = 0;
    actualizarPantalla();
});

function iniciarConteoPasos() {
    let ultimaLectura = { x: null, y: null, z: null };
    let ultimoPaso = Date.now();

    window.addEventListener("devicemotion", (event) => {
        const { x, y, z } = event.accelerationIncludingGravity;

        if (ultimaLectura.x !== null) {
            const deltaX = Math.abs(ultimaLectura.x - x);
            const deltaY = Math.abs(ultimaLectura.y - y);
            const deltaZ = Math.abs(ultimaLectura.z - z);
            const totalDelta = deltaX + deltaY + deltaZ;
            const ahora = Date.now();

            if (totalDelta > 15 && (ahora - ultimoPaso) > 500) {
                pasos++;
                caloriasQuemadas += pesoUsuario * 0.0005;
                ultimoPaso = ahora;
                actualizarPantalla();
            }
        }
        ultimaLectura = { x, y, z };
    });
}

if (typeof DeviceMotionEvent.requestPermission === 'function') {
    const permisoBtn = document.createElement('button');
    permisoBtn.textContent = "Activar sensores";
    permisoBtn.style.display = "block";
    permisoBtn.style.margin = "20px auto";
    permisoBtn.onclick = () => {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response === 'granted') {
                iniciarConteoPasos();
                permisoBtn.remove();
            } else {
                alert("Permiso denegado.");
            }
        });
    };
    document.body.prepend(permisoBtn);
} else {
    iniciarConteoPasos();
}

actualizarPantalla();

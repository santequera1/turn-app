let numeroDeTurnos = 0;  // Inicializa el número de turnos
let numeromenor = numeroDeTurnos - 1;
var llamar = document.getElementById("boton-alerta");
let actualizacionEnProgreso = false; // Variable para rastrear si la actualización está en curso

let primerTurnoDetectado = false;  // Variable para controlar si se ha detectado el primer turno
var mismapagina = document.URL;
const reiniciar = 0;
var llamar = document.getElementById("boton-alerta");
var nombreClienteElemento = document.querySelectorAll(".nombre-clienten");
var nombreCliente = nombreClienteElemento.length > 0 ? (nombreClienteElemento[0].textContent || nombreClienteElemento[0].innerText) : '';


document.addEventListener('DOMContentLoaded', function() {
    // Hacer algo aquí que agregue nuevos elementos al DOM
    nuevosElementos = nombreCliente;
    console.log(nuevosElementos); // Puedes acceder a nuevosElementos aquí
});




function fire(nombreCliente) {
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `Llamando a ${nombreCliente}`,
        showConfirmButton: false,
        timer: 5000
    });
}


function fireimag(nombreCliente) {
    Swal.fire({
        title: `Llamando a ${nombreCliente}`,
        text: "En reparación",
        imageUrl: "/static/turnos_app/js/mecanico.png",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Imagen Motocicleta"
      });
}

function sonar() {
    var audio = new Audio("/static/turnos_app/js/turnosound.mp3");
    audio.play();
}

function agendado() {
    navigator.vibrate(1000);
    sonar();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Nuevo turno`,
        showConfirmButton: false,
        timer: 5000
    });



    setTimeout(function () {
        location.reload();
    }, 2500);
}

function terminado() {
    sonar();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Finalizó un turno`,
        showConfirmButton: false,
        timer: 5000
    });

    setTimeout(function () {
        location.reload();
    }, 2500);
}

function miFunc(nombreCliente) {
    const synth = window.speechSynthesis;
    const text = `Llamando a ${nombreCliente}`;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = 1;
    utterThis.rate = 0.93;
    synth.speak(utterThis);
    fire(nombreCliente);
}


function miFuncLlamar(nombreCliente) {
    const synth = window.speechSynthesis;
    const text = `En reparación la motocicleta de ${nombreCliente}`;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = 1;
    utterThis.rate = 0.93;
    synth.speak(utterThis);
    fire(nombreCliente);
}



function llamandoActivo(turnoId) {
    var aviso = localStorage.getItem('aviso');
    if (aviso === 'true') {

        console.log('Avisando para el turno con ID:', turnoId);
        fire(nombreCliente);  // Puedes ajustar esto según tus necesidades
        miFunc(nombreCliente);
    }
}

document.addEventListener("DOMContentLoaded", function() {

    var avisando = document.getElementById("avisando");


    if (avisando) {
        avisando.onclick = function() {
            localStorage.setItem('aviso', 'true');
            llamandoActivo(nombreCliente);
        };
    }




    llamandoActivo(nombreCliente);
});


const llamandoActivoFunction = () => {
    fetch('/obtener-lista-turnos/')
    .then(response => response.json())
    .then(data => {
        console.log(data.turnos);
        llamandoActivo(nombreCliente)
    })
}


function almacenarCliente(nombreCliente) {
    // Almacena el nombre del cliente en localStorage
    localStorage.setItem('clienteParaLlamar', nombreCliente);
}




const actualizarListaTurnos = () => {
    fetch('/obtener-lista-turnos/')
        .then(response => response.json())
        .then(data => {
            console.log(data.turnos);
            if (data.turnos.length === 1 && !primerTurnoDetectado) {
                primerTurno();
                llamandoActivo(nombreCliente)
                almacenarCliente(nombreCliente)
                primerTurnoDetectado = true;
            } else if (data.turnos.length === numeroDeTurnos + 1) {
                agendado();

                llamandoActivo(nombreCliente)
                almacenarCliente(nombreCliente)
            } else if (data.turnos.length === numeroDeTurnos - 1) {
                terminado();
                llamandoActivo(nombreCliente)

                almacenarCliente(nombreCliente)
            } else {
                console.log("No hay cambios en los turnos");
            }

            numeroDeTurnos = data.turnos.length;
        })

        .catch(error => {
            console.error('Error al obtener la lista de turnos:', error);
        });
};






// Llamando a la función de actualización al cargar la página
actualizarListaTurnos();

// Actualiza cada X segundos
setInterval(actualizarListaTurnos, 3000);

setInterval(llamandoActivoFunction, 2500);








class Auto {
    constructor(placas, propietario, horaEntrada) {
        this.placas = placas;
        this.propietario = propietario;
        this.horaEntrada = horaEntrada;
    }
}

class Cola {
    constructor() {
        this.autos = [];
    }

    queue(auto) {
        this.autos.push(auto);
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.autos.shift();
        } else {
            return null;
        }
    }

    isEmpty() {
        return this.autos.length === 0;
    }
}

const estacionamiento = new Cola();

function mostrarFormulario(tipo) {
    if (tipo === 'entrada') {
        document.getElementById('entradaForm').style.display = 'block';
        document.getElementById('salidaForm').style.display = 'none';
    } else if (tipo === 'salida') {
        document.getElementById('salidaForm').style.display = 'block';
        document.getElementById('entradaForm').style.display = 'none';
    }
}

/*function registrarEntrada() {
    const placas = document.getElementById('placas').value;
    const propietario = document.getElementById('propietario').value;

    if (placas === '' || propietario === '') {
        alert('No se pueden dejar campos vacíos.');
        return;
    }

    const horaEntrada = new Date();

    const auto = new Auto(placas, propietario, horaEntrada);
    estacionamiento.queue(auto);

    document.getElementById('placas').value = '';
    document.getElementById('propietario').value = '';

    document.getElementById('resultado').innerHTML = `Entrada registrada para ${auto.propietario}`;
}*/

function registrarEntrada() {
    const placas = document.getElementById('placas').value;
    const propietario = document.getElementById('propietario').value;

    if (placas === '' || propietario === '') {
        alert('No se pueden dejar campos vacíos.');
        return;
    }

    // Validar si la matrícula ya existe en el estacionamiento
    const matriculaExistente = estacionamiento.autos.find(auto => auto.placas === placas);
    if (matriculaExistente) {
        alert('Esta matrícula ya está en el estacionamiento.');
    } else {
        const horaEntrada = new Date();

        const auto = new Auto(placas, propietario, horaEntrada);
        estacionamiento.queue(auto);

        document.getElementById('placas').value = '';
        document.getElementById('propietario').value = '';

        document.getElementById('resultado').innerHTML = `Entrada registrada para ${auto.propietario}`;
    }
}


function registrarSalida() {
    if (estacionamiento.isEmpty()) {
        document.getElementById('resultado').innerHTML = 'El estacionamiento está vacío.';
        return;
    }

    const auto = estacionamiento.dequeue();
    const horaSalida = new Date();
    const tiempoEstacionado = Math.floor((horaSalida - auto.horaEntrada) / 1000);
    const costoPorSegundo = 120;
    const costo = (tiempoEstacionado * costoPorSegundo) / 60; // $2.00 pesos por segundo

    document.getElementById('resultado').innerHTML = `
        Placas: ${auto.placas}<br>
        Propietario: ${auto.propietario}<br>
        Hora de Entrada: ${auto.horaEntrada.toLocaleString()}<br>
        Hora de Salida: ${horaSalida.toLocaleString()}<br>
        Tiempo Estacionado: ${tiempoEstacionado} segundos<br>
        Costo: $${costo.toFixed(2)} pesos
    `;
}

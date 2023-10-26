// Implementación de una cola en JavaScript
function Queue() {
    this.items = [];
}

Queue.prototype.queue = function (element) {
    this.items.push(element);
};

Queue.prototype.dequeue = function () {
    if (this.isEmpty()) {
        return null;
    }
    return this.items.shift();
};

Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
};

// Creamos una instancia de la cola
const cola = new Queue();

function agregarCliente() {
    const nombre = document.getElementById("nombre").value;
    const movimiento = document.getElementById("movimiento").value;

    if (nombre === "" || movimiento === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const cliente = {
        nombre,
        movimiento
    };

    cola.queue(cliente);
    actualizarCola();
    limpiarCampos();
}

function atenderCliente() {
    if (!cola.isEmpty()) {
        const clienteAtendido = cola.dequeue();
        alert(`Cliente atendido.\nNombre: ${clienteAtendido.nombre}\nTipo de Movimiento: ${clienteAtendido.movimiento}`);
        actualizarCola();
    } else {
        alert("No hay clientes en la cola.");
    }
}

function actualizarCola() {
    const colaElement = document.getElementById("cola");
    colaElement.innerHTML = "";

    for (let i = 0; i < cola.items.length; i++) {
        const cliente = cola.items[i];
        const listItem = document.createElement("li");
        listItem.textContent = `Nombre: ${cliente.nombre}, Movimiento: ${cliente.movimiento}`;
        colaElement.appendChild(listItem);
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("movimiento").value = "";
}

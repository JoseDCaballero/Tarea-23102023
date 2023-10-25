function Stack(initialValues) {
    this.items = initialValues ? initialValues : [];
}

Stack.prototype.push = function (element) {
    this.items.push(element);
};

Stack.prototype.pop = function () {
    if (this.isEmpty()) {
        return "Underflow";
    }
    return this.items.pop();
};

Stack.prototype.peek = function () {
    return !this.isEmpty() ? this.items[this.items.length - 1] : undefined;
};

Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
};

function mostrarPila() {
    const pilaElement = document.getElementById("pila");
    pilaElement.innerHTML = "Pila: " + JSON.stringify(pila.items);
}

window.onload = function () {
    mostrarPila();
};

const initialValues = [1, 2, 3, 4, 5]; // Valores iniciales de la pila
const pila = new Stack(initialValues);

function agregarValor() {
    const valor = parseInt(document.getElementById("agregar").value);

    if (!isNaN(valor)) {
        pila.push(valor);
        mostrarPila();
    } else {
        alert("Por favor, ingrese un número válido.");
    }
}

function reemplazarValor() {
    const nuevo = parseInt(document.getElementById("nuevo").value);
    const viejo = parseInt(document.getElementById("viejo").value);

    if (isNaN(nuevo) || isNaN(viejo)) {
        alert("No puede dejar campos vacíos.");
        return;
    }

    const pilaCopia = new Stack();
    while (!pila.isEmpty()) {
        pilaCopia.push(pila.pop());
    }

    let seRealizoReemplazo = false;

    while (!pilaCopia.isEmpty()) {
        const valor = pilaCopia.pop();
        if (valor === viejo) {
            pila.push(nuevo);
            seRealizoReemplazo = true;
        } else {
            pila.push(valor);
        }
    }

    // Actualizar el contenido del elemento con id "pila" para mostrar la pila actualizada
    const pilaElement = document.getElementById("pila");
    pilaElement.innerHTML = "Pila: " + JSON.stringify(pila.items);

    if (!seRealizoReemplazo) {
        alert("El valor ingresado no existe en la pila.");
    }
}

function mostrarPilaAlert() {
    alert("Los valores guardados son: " + JSON.stringify(pila.items));
}

function Stack() {
    this.items = [];
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
    pilaElement.innerHTML = "Los valores guardados son: " + JSON.stringify(pila.items);
}

const pila = new Stack();

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
    pilaElement.innerHTML = "Los valores guardados son: " + JSON.stringify(pila.items);

    if (!seRealizoReemplazo) {
        alert("El valor ingresado no existe en la pila.");
    }
}

function mostrarPilaAlert() {
    alert("Los valores guardados son: " + JSON.stringify(pila.items));
}

/*function Stack() {
    this.items = [];
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

function reemplazarValor() {
    const nuevo = parseInt(document.getElementById("nuevo").value);
    const viejo = parseInt(document.getElementById("viejo").value);

    if (isNaN(nuevo) || isNaN(viejo)) {
        alert("Por favor, ingrese valores numéricos válidos.");
        return;
    }

    const stack = new Stack();

    // Llenar la pila con valores de ejemplo (puedes modificar esto si lo deseas)
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(5);
    stack.push(4);

    const tempStack = new Stack();
    while (!stack.isEmpty()) {
        if (stack.peek() === viejo) {
            tempStack.push(nuevo);
        } else {
            tempStack.push(stack.pop());
        }
    }

    const resultStack = new Stack();
    while (!tempStack.isEmpty()) {
        resultStack.push(tempStack.pop());
    }

    document.getElementById("result").innerHTML = "Pila después de reemplazar el valor: " + JSON.stringify(resultStack.items);
}


class Stack{
    constructor(){
        this.stack = []
    }

    push(element) {
        this.stack.push(element)
        return this.stack
    }

    pop() {
        return this.stack.pop
    }   
}*/

/*Reemplazar valor Escribir una función Reemplazar que tenga como argumentos una pila
con tipo de elemento int y dos valores int: nuevo y viejo de forma que si el segundo valor aparece en
algún lugar de la pila, sea reemplazado por el segundo.*/ 
let timeLeft = 20;
let squareCount = 0;
let timerInterval;
let cola = [];
let cooldown = 20;
let colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
    'grey', 'lightblue', 'lime', 'violet', 'black', 'silver', 'gold', 'beige'
];
let totalSeconds = 0;
let correctChoices = 0;

function createSquare() {
    const container = document.getElementById('container');
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    squareCount++;

    if (squareCount === 3) {
        cooldown = 10;
        cola.push(3);
    } else if (squareCount === 4) {
        cooldown = 5;
        cola.push(4);
    } else if (squareCount === 5) {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = 'Juego terminado, se alcanzó el límite de contenedores (5)';
        clearInterval(minuteInterval);

        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        // Configurar el contenido de la ventana modal
        const modalContador = document.getElementById('modalContador');
        modalContador.textContent = document.getElementById('contador').textContent;

        const modalConteo = document.getElementById('modalConteo');
        modalConteo.textContent = document.getElementById('conteo').textContent;

        // Agregar el evento para cerrar la ventana modal
        const closeModalButton = document.getElementById('closeModal');
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else if (squareCount === 1) {
        updateColorButtons();
    }
}

function updateColorButtons() {
    const colorButtons = document.getElementById('color-buttons');
    colorButtons.innerHTML = '';
    for (const color of colors) {
        const colorButton = document.createElement('button');
        colorButton.classList.add('color-button');
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener('click', () => checkColor(color, colorButton));
        colorButtons.appendChild(colorButton);
    }
}

function checkColor(color, colorButton) {
    if (color === document.getElementById('random-color').textContent.replace('Color aleatorio: ', '')) {

        cola.shift(); // Cambio clave para usar una cola
        squareCount--;
        const container = document.getElementById('container');
        container.removeChild(container.firstElementChild); // Cambio clave para eliminar el primer cuadrado

        correctChoices++;

        document.getElementById('conteo').textContent = `${correctChoices} carro${correctChoices === 1 ? '' : 's'} pintado${correctChoices === 1 ? '' : 's'}`;

        updateColorButtons();
        document.getElementById('random-color').textContent = 'Color aleatorio:';
    }
    if (cola.length === 0) {
        cooldown = 20;
    }
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timeLeft >= 0) {
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
    }
    timeLeft--;

    if (timeLeft < 0) {
        createSquare();
        timeLeft = cooldown;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('random-color').textContent = `Color aleatorio: ${randomColor}`;
    }
}

let minutes = 0;
let seconds = 0;
const contadorElement = document.getElementById('contador');

function updateCounter() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    contadorElement.textContent = `Tiempo transcurrido: ${minutes} minuto${minutes === 1 ? '' : 's'} ${seconds} segundo${seconds === 1 ? '' : 's'}`;
}

const minuteInterval = setInterval(updateCounter, 1000);

document.getElementById('restart-button').addEventListener('click', () => {

    clearInterval(timerInterval);
    clearInterval(minuteInterval);
    const container = document.getElementById('container');
    container.innerHTML = '';
    timeLeft = 20;
    cooldown = 20;
    squareCount = 0;
    cola = []; // Cambio clave para usar una cola
    correctChoices = 0;
    document.getElementById('timer').textContent = 'Tiempo restante: 20 segundos';
    minutes = 0;
    seconds = 0;
    contadorElement.textContent = 'Tiempo transcurrido: 0 minutos 0 segundos';
    document.getElementById('conteo').textContent = '0 carros pintados';
    updateColorButtons();
    timerInterval = setInterval(updateTimer, 1000);
    minuteInterval = setInterval(updateCounter, 1000);
});

timerInterval = setInterval(updateTimer, 1000);

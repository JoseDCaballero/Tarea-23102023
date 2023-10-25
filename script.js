let timeLeft = 20;
let squareCount = 0;
let timerInterval;
let queue = [];
let cooldown = 20;
let colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
    'grey', 'lightblue', 'lime', 'violet', 'black', 'silver', 'gold', 'beige'
];
let totalSeconds = 0;
let correctChoices = 0;

let minutes = 0;
let seconds = 0;
let isGamePaused = false; // variable para controlar cuandp el juego está en pausa o no

function enqueue(value) {
    queue.push(value);
}

function dequeue() {
    return queue.shift();
}

function createSquare() {
    const container = document.getElementById('container');
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    squareCount++;

    if (squareCount === 3) {
        cooldown = 10;
        enqueue(3);
    } else if (squareCount === 4) {
        cooldown = 5;
        enqueue(4);
    } else if (squareCount === 5) {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = 'Juego terminado, se alcanzó el límite de contenedores (5)';
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        const modalContador = document.getElementById('modalContador');
        modalContador.textContent = document.getElementById('contador').textContent;

        const modalConteo = document.getElementById('modalConteo');
        modalConteo.textContent = document.getElementById('conteo').textContent;

        const closeModalButton = document.getElementById('closeModal');
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        isGamePaused = true;
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
    if (color === document.getElementById('random-color').textContent.replace('Color: ', '')) {
        dequeue();
        squareCount--;
        const container = document.getElementById('container');
        container.removeChild(container.firstElementChild);

        correctChoices++;

        document.getElementById('conteo').textContent = `${correctChoices} carro${correctChoices === 1 ? '' : 's'} pintado${correctChoices === 1 ? '' : 's'}`;

        updateColorButtons();
        document.getElementById('random-color').textContent = 'Color:';
    }
    if (queue.length === 0) {
        cooldown = 20;
    }
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timeLeft >= 0 && !isGamePaused) {
        timerElement.textContent = `Otro carro se enfilará en: ${timeLeft} segundos`;
    }
    timeLeft--;

    if (timeLeft < 0 && !isGamePaused) {
        createSquare();
        timeLeft = cooldown;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('random-color').textContent = `Color: ${randomColor}`;
    }
}

const contadorElement = document.getElementById('contador');

function updateCounter() {
    if (!isGamePaused) {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    contadorElement.textContent = `Tiempo transcurrido: ${minutes} minuto${minutes === 1 ? '' : 's'} ${seconds} segundo${seconds === 1 ? '' : 's'}`;
}

const minuteInterval = setInterval(updateCounter, 1000);

timerInterval = setInterval(updateTimer, 1000);
function sumarNumerosGrandes() {
    const numero1 = document.getElementById("first").value.toString();
    const numero2 = document.getElementById("second").value.toString();

    const resultado = sumaNumerosGrandes(numero1, numero2);

    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}

function sumaNumerosGrandes(num1, num2) {
    // Convierte los números a pilas
    const pila1 = num1.split('').map(Number);
    const pila2 = num2.split('').map(Number);
    const resultado = [];

    let carry = 0;

    while (pila1.length || pila2.length) {
        const digito1 = pila1.pop() || 0;
        const digito2 = pila2.pop() || 0;

        const suma = digito1 + digito2 + carry;
        carry = Math.floor(suma / 10);
        resultado.push(suma % 10);
    }

    if (carry) {
        resultado.push(carry);
    }

    return resultado.reverse().join('');
}

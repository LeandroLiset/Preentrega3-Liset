let todosLosNumeros = [];

function guardarEnLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function cargarDesdeLocalStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

todosLosNumeros = cargarDesdeLocalStorage('todosLosNumeros');

function mostrarNumerosGuardados() {
    const numerosGuardadosElement = document.getElementById('numerosGuardados');
    numerosGuardadosElement.innerHTML = '';

    todosLosNumeros.forEach(numero => {
        const li = document.createElement('li');
        li.textContent = numero;
        numerosGuardadosElement.appendChild(li);
    });
}

function limpiarLocalStorage() {
    localStorage.removeItem('todosLosNumeros');
    todosLosNumeros = [];
    mostrarNumerosGuardados();
}

document.getElementById('clearLocalStorage').addEventListener('click', limpiarLocalStorage);

function operacion(operador, numeros) {
    let resultado;

    switch (operador) {
        case '+':
            resultado = numeros.reduce((a, b) => a + b, 0);
            break;
        case '-':
            resultado = numeros.reduce((a, b) => a - b);
            break;
        case '*':
            resultado = numeros.reduce((a, b) => a * b, 1);
            break;
        case '/':
            resultado = numeros.reduce((a, b) => a / b);
            break;
        default:
            resultado = 'Error: Operador no válido';
            break;
    }

    return resultado;
}

let resultadoAnterior;

document.getElementById('usarResultadoAnterior').addEventListener('change', function () {
    const numero1Input = document.getElementById('numero1');
    if (this.checked) {
        numero1Input.value = resultadoAnterior !== undefined ? resultadoAnterior : '';
        numero1Input.disabled = true;
    } else {
        numero1Input.disabled = false;
        numero1Input.value = '';
    }
});

document.getElementById('calcularBtn').addEventListener('click', () => {
    let operador = document.getElementById('operador').value;
    let usarResultadoAnterior = document.getElementById('usarResultadoAnterior').checked;
    let numero1 = usarResultadoAnterior && resultadoAnterior !== undefined ? resultadoAnterior : parseFloat(document.getElementById('numero1').value);
    let numero2 = parseFloat(document.getElementById('numero2').value);
    let numeros = [numero1, numero2];

    if (numeros.some(isNaN) || !['+', '-', '*', '/'].includes(operador)) {
        console.error("Error: Datos inválidos.");
        return;
    }

    for (let i = 0; i < numeros.length; i++) {
        todosLosNumeros.push(numeros[i]);
    }

    guardarEnLocalStorage('todosLosNumeros', todosLosNumeros);

    let resultado = operacion(operador, numeros);
    let maximoGlobal = Math.max(...todosLosNumeros);
    let minimoGlobal = Math.min(...todosLosNumeros);
    let numeroAleatorio = Math.floor(Math.random() * (maximoGlobal - minimoGlobal + 1)) + minimoGlobal;

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML =
        `El resultado es: ${resultado}<br>
        El número más alto utilizado es: ${maximoGlobal}<br>
        El número más bajo utilizado es: ${minimoGlobal}<br>
        El número aleatorio entre el máximo y el mínimo es: ${numeroAleatorio}`;

    resultadoAnterior = resultado;

    if (document.getElementById('usarResultadoAnterior').checked) {
        document.getElementById('numero1').value = resultadoAnterior;
    }

    mostrarNumerosGuardados();
});

document.getElementById('clearLocalStorage').addEventListener('click', limpiarLocalStorage);

mostrarNumerosGuardados();

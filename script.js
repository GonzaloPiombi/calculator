const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear-button');
const display = document.querySelector('.display');
const smallDisplay = document.querySelector('.small-display');
const dotButton = document.querySelector('#dot');
const deleteButton = document.querySelector('#delete');
const togglePositiveNegative = document.querySelector('#toggle');

let num1 = null;
let num2 = null;
let result = null;
let operator = null;
let isEqualsPressed;

numberButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        pressNumber(e.target.textContent);
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        pressOperator(e.target.textContent);
    });
});

equalsButton.addEventListener('click', () => { pressEquals(); });

clearButton.addEventListener('click', () => { pressClear() });

deleteButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
});

togglePositiveNegative.addEventListener('click', () => { pressToggle(); });

document.addEventListener('keydown', e => {
    if (e.key >= 0 || e.key === '.') {
        pressNumber(e.key)
    } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        pressOperator(e.key);
    } else if (e.key === '=' || e.key === 'Enter') {
        pressEquals();
    } else if (e.key === 'c' || e.key === 'C') {
        pressClear();
    } else if (e.key === 'Backspace') {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    } else if (e.key === 't' || e.key === 'T') {
        pressToggle();
    }
});

function pressNumber(e) {
    pressedButton = e;
    display.textContent += pressedButton;
    if (display.textContent.includes('.')) {
        dotButton.disabled = true;
    }
    equalsButton.disabled = false;
    enableOperatorButtons();
}

function pressOperator(e) {
    equalsButton.disabled = true;
    disableOperatorButtons();
    dotButton.disabled = false;
    partialOperator = e;
    decideValues();
    checkValues();
    operator = e;
} 

function pressEquals() {
    num2 = display.textContent;
    isEqualsPressed = true;
    equalsButton.disabled = true;
    if (num1 === null || num2 === null) {
        return;
    } else {
        result = operate(operator, num1, num2);
        checkDecimalsAndRound();
        smallDisplay.textContent = num1 + ' ' + operator + ' ' + num2;
        display.textContent = result;
        num1 = null;
        if (display.textContent.includes('.')) {
            dotButton.disabled = true;
        } else {
            dotButton.disabled = false;
        }
    }
}

function pressClear() {
    num1 = null;
    num2 = null;
    result = null;
    operator = null;
    display.textContent = '';
    smallDisplay.textContent = '';
    isEqualsPressed = false;
    equalsButton.disabled = false;
    enableOperatorButtons();
    dotButton.disabled = false;
}

function pressToggle() {
    if (display.textContent >= 0) {
        display.textContent = '-' + display.textContent;
    } else {
        display.textContent = display.textContent.slice(1);
    }
}

function decideValues() {
    if (num1 === null) {
        num1 = display.textContent;
    } else {
        num2 = display.textContent;
    }
}

function checkValues() {
    if (isEqualsPressed) {
        smallDisplay.textContent = num1 + ' ' + partialOperator;
        display.textContent = '';
        isEqualsPressed = false;
    } else if (num1 !== null && num2 !== null) {
        result = operate(operator, num1, num2);
        if (isNaN(result)) return;
        checkDecimalsAndRound();
        num1 = result;
        smallDisplay.textContent = num1 + ' ' + partialOperator;
        display.textContent = '';
    } else {
        display.textContent = '';
        smallDisplay.textContent = num1 + ' ' + partialOperator;
    }
}

function checkDecimalsAndRound() {
    if (result === '∞ Don\'t divide by 0 please ∞') return;
    else if (result % 1 !== 0) {
        result = Math.round(result * 100) / 100;
    }
}

function disableOperatorButtons() {
    operatorButtons.forEach(button => button.disabled = true);
}

function enableOperatorButtons() {
    operatorButtons.forEach(button => button.disabled = false);
}

function add(num1, num2) {
    return (+num1 + +num2);
}

function subtract(num1, num2) {
    return (+num1 - +num2);
}

function multiply(num1, num2) {
    return (+num1 * +num2);
}

function divide(num1, num2) {
    if (num2 == 0) {
        return '∞ Don\'t divide by 0 please ∞'
    } else {
        return (+num1 / +num2);
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2)
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case 'X':
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    }
}

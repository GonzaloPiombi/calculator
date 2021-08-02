const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear-button');
const display = document.querySelector('.display');
const smallDisplay = document.querySelector('.small-display');

let num1 = null;
let num2 = null;
let result = null;
let operator = null;
let isEqualsPressed;

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        pressedButton = e.target.textContent;
        display.textContent += pressedButton;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        partialOperator = e.target.textContent;
        decideValues();
        checkValues();
        operator = e.target.textContent;
    });
});

equalsButton.addEventListener('click', () => {
    num2 = display.textContent;
    result = operate(operator, num1, num2);
    checkDecimalsAndRound();
    smallDisplay.textContent = num1 + ' ' + operator + ' ' + num2;
    display.textContent = result;
    num1 = result;
    isEqualsPressed = true;
});

clearButton.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    result = null;
    operator = null;
    display.textContent = '';
    smallDisplay.textContent = '';
    isEqualsPressed = false;
});

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
    if (result % 1 !== 0) {
        result = Math.round(result * 100) / 100;
    }
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
        return '∞ Don\'t divide by 0 ∞'
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
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    }
}

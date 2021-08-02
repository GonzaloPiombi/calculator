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

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        pressedButton = e.target.textContent;
        display.textContent += pressedButton;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        decideValues();
        operator = e.target.textContent;
        display.textContent = '';
        smallDisplay.textContent = num1 + ' ' + operator;
    });
});

equalsButton.addEventListener('click', () => {
    num2 = display.textContent;
    result = operate(operator, num1, num2);
    smallDisplay.textContent = num1 + ' ' + operator + ' ' + num2;
    display.textContent = result;
    num1 = result;
});

function decideValues() {
    if (num1 === null) {
        num1 = display.textContent;
    } else {
        num2 = display.textContent;
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

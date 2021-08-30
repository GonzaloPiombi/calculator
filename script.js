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

clearButton.addEventListener('click', () => { pressClear(); });

deleteButton.addEventListener('click', () => { pressDelete(); });

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
        pressDelete();
    } else if (e.key === 't' || e.key === 'T') {
        pressToggle();
    }
});

function pressNumber(e) {
    pressedButton = e;
    if (display.textContent.length > 15) return;
    if (display.textContent.includes('.') && e === '.') {
        dotButton.disabled = true;
    } else {
        display.textContent += pressedButton;
    }
    equalsButton.disabled = false;
    enableOperatorButtons();
    equalsButton.focus();
}

function pressOperator(e) {
    equalsButton.disabled = true;
    disableOperatorButtons();
    dotButton.disabled = false;
    partialOperator = e;
    decideValues();
    checkValues();
    operator = e;
    equalsButton.focus();
} 

function pressEquals() {
    num2 = display.textContent;
    isEqualsPressed = true;
    equalsButton.disabled = true;
    if (num1 === null || num2 === null || operator === null) {
        return;
    } else {
        result = operate(operator, num1, num2);
        checkDecimalsAndRound();
        smallDisplay.textContent = num1 + ' ' + operator + ' ' + num2;
        display.textContent = result;
        changeDisplayFontSize();
        num1 = null;
        checkIfDecimal();
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
    smallDisplay.style = 'font-size: 1.7rem';
    display.style = 'font-size: 1.8rem';
}

function pressToggle() {
    if (display.textContent >= 0) {
        display.textContent = '-' + display.textContent;
    } else {
        display.textContent = display.textContent.slice(1);
    }
}

function pressDelete() {
    let lastChar = smallDisplay.textContent.slice(-1);
    if (display.textContent === '' && (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === 'X')) {
        smallDisplay.textContent = smallDisplay.textContent.slice(0, smallDisplay.textContent.length - 1);
        operator = null;
        enableOperatorButtons();
        isEqualsPressed = true;
    }
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    checkIfDecimal();
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
    if (result === '∞ Don\'t divide by 0 ∞') return;
    else if (result % 1 !== 0) {
        result = Math.round(result * 100) / 100;
    }
}

function checkIfDecimal() {
    if (display.textContent.includes('.')) {
        dotButton.disabled = true;
    } else {
        dotButton.disabled = false;
    }
}

function changeDisplayFontSize () {
    if (smallDisplay.textContent.length > 30) {
        smallDisplay.style = 'font-size: 0.7rem';
    } else if (smallDisplay.textContent.length > 16) {
        smallDisplay.style = 'font-size: 0.9rem';
    } else {
        smallDisplay.style = 'font-size: 1.7rem';
    }
    if (display.textContent.length > 16) {
        display.style = 'font-size: 1.4rem';
    } else {
        display.style = 'font-size: 1.8rem';
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
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    }
}

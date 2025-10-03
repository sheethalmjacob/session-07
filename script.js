let currentInput = '';
let previousInput = '';
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
}

function addNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += num;
    updateDisplay(currentInput);
}

function addDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

function addOperator(operator) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    previousInput = currentInput;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || previousInput === '' || currentInput === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch(currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
    }
    
    // Round to avoid floating point precision issues
    result = Math.round(result * 1000000) / 1000000;
    
    currentInput = result.toString();
    updateDisplay(currentInput);
    previousInput = '';
    currentOperator = null;
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = null;
    updateDisplay('0');
    shouldResetDisplay = false;
}

function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }
}
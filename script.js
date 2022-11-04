const display = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector(".all_clear");
const backspace = document.querySelector(".backspace");
const negation = document.querySelector(".negation");
const equals = document.querySelector(".equal_sign");

let currentDisplayValue = "";
let a = null;
let b = null;
let symbol = null;
let result = null;

const operators = {
    "+": function add(a, b) {
        return a + b;
    },

    "-": function subtract(a, b) {
        return a - b;
    },

    "*": function multiply(a, b) {
        return a * b;
    },

    "/": function divide(a, b) {
        if (b === 0) {
            return 0;
        }
        return a / b;
    },
};

const clearCalc = () => {
    display.textContent = "0";
    currentDisplayValue = "";
    a = null;
    b = null;
    symbol = null;
    result = null;
    console.clear();
    return;
};

const removeFromEnd = () => {
    let displayLength = display.textContent.length;

    if (displayLength === 1) display.textContent = "0";
    else {
        display.textContent = display.textContent.slice(0, displayLength - 1);
    }
    currentDisplayValue = display.textContent;
    return currentDisplayValue;
};

const negateNum = () => {
    let currentNum = parseFloat(display.textContent);
    if (currentNum === a) {
        a = -a;
        display.textContent = a;
        return a;
    }
    if (currentNum === b) {
        b = -b;
        display.textContent = b;
        return b;
    }
};

function operate() {
    if (result) {
        a = result;
    }
    result = Math.floor(operators[symbol](a, b) * 1000) / 1000;
    display.textContent = result;
    currentDisplayValue = display.textContent;
    return result;
}

function getValues() {
    if (!symbol) {
        a = parseFloat(currentDisplayValue);
        return a;
    }

    if (symbol) {
        b = parseFloat(currentDisplayValue);
        return b;
    }
    return;
}

function displayNumbers(e) {
    let strNum = e.target.value;

    let operators = ["+", "-", "*", "/"];
    for (let operator of operators) {
        if (display.textContent === operator) {
            display.textContent = "";
        }
    }

    if (display.textContent === "0") display.textContent = strNum;
    else {
        display.textContent += strNum;
    }

    currentDisplayValue = display.textContent;
    getValues();
    return;
}

function displaySymbol(e) {
    let operator = e.target.value;
    symbol = operator;
    display.textContent = operator;
    return symbol;
}

allNumbers.forEach((number) =>
    number.addEventListener("click", displayNumbers)
);
operations.forEach((symbol) => symbol.addEventListener("click", displaySymbol));
clear.addEventListener("click", clearCalc);
backspace.addEventListener("click", removeFromEnd);
negation.addEventListener("click", negateNum);
equals.addEventListener("click", operate);

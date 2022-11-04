const display = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector(".all_clear");

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
            return;
        }
        return a / b;
    },
};

clearCalc = () => {
    display.textContent = "0";
    currentDisplayValue = "";
    a = null;
    b = null;
    symbol = null;
    result = null;
};

function operate(symbol, a, b) {
    return operators[symbol](a, b);
}

function getValues() {
    if (!symbol) {
        a = parseFloat(currentDisplayValue);
        console.log(`a = ${a}`);
        return a;
    }

    if (symbol) {
        b = parseFloat(currentDisplayValue);
        console.log(`b = ${b}`);
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
    console.log(currentDisplayValue);
    getValues();
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

const display = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector(".all_clear");
const backspace = document.querySelector(".backspace");
const negation = document.querySelector(".negation");
const equals = document.querySelector(".equal_sign");
const decimal = document.querySelector(".decimal");

let currentDisplayValue = null;
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

    if (displayLength === 1) {
        display.textContent = "0";
        a = null;
        b = null;
        result = null;
    } else {
        display.textContent = display.textContent.slice(0, displayLength - 1);
        a = null;
        b = null;
        result = display.textContent;
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
    if (currentNum === result) {
        result = -result;
        display.textContent = result;
        return result;
    }
};

function operate() {
    if (!a && !b) {
        return;
    }

    if (result || result === 0) {
        a = result;
    }

    if (a && !b) {
        display.textContent = a;
        return;
    }

    result = Math.floor(operators[symbol](a, b) * 1000) / 1000;
    display.textContent = result;
    currentDisplayValue = display.textContent;
    console.log(result);
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

    if (display.textContent === `${result}`) {
        clearCalc();
    }

    if (display.textContent === "0") {
        display.textContent = strNum;
    } else {
        display.textContent += strNum;
    }

    currentDisplayValue = display.textContent;
    return getValues();
}

function displaySymbol(e) {
    let operator = e.target.value;
    symbol = operator;
    display.textContent = operator;
    return symbol;
}

function displayDecimal(e) {
    let decimal = e.target.value;

    if (display.textContent.includes(`${decimal}`)) return;
    else {
        display.textContent += decimal;
    }
    return;
}

allNumbers.forEach((number) =>
    number.addEventListener("click", displayNumbers)
);
operations.forEach((symbol) => symbol.addEventListener("click", displaySymbol));
clear.addEventListener("click", clearCalc);
backspace.addEventListener("click", removeFromEnd);
negation.addEventListener("click", negateNum);
equals.addEventListener("click", operate);
decimal.addEventListener("click", displayDecimal);

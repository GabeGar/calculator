const display = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clear = document.querySelector(".all_clear");
const backspace = document.querySelector(".backspace");
const negation = document.querySelector(".negation");
const equals = document.querySelector(".equal_sign");
const decimal = document.querySelector(".decimal");
const history = document.querySelector(".history");

let currentDisplayValue = null;
let a = null;
let b = null;
let symbol = null;
let result = null;
let dividedByZero = false;
let specialDivisionSymbol = "÷";

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
        return a / b;
    },
};

const clearCalc = () => {
    history.textContent = "history";
    display.textContent = "0";
    currentDisplayValue = "";
    a = null;
    b = null;
    symbol = null;
    result = null;
    return;
};

const setToNull = () => {
    a = null;
    b = null;
    symbol = null;
    result = null;
};

const updateCurrentDisplayVal = () => {
    currentDisplayValue = display.textContent;
};

const removeFromEnd = () => {
    let displayLength = display.textContent.length;

    if (displayLength === 1) {
        display.textContent = "0";
        setToNull();
    } else {
        display.textContent = display.textContent.slice(0, displayLength - 1);
        a = null;
        b = null;
        result = display.textContent;
    }
    updateCurrentDisplayVal();
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

    if (symbol === "/" && b === 0) {
        dividedByZero = true;
        history.textContent = `Dividing by zero is outlawed.`;
        return dividedByZero;
    }

    if (result || result === 0) {
        a = result;
    }

    if (a && !b) {
        display.textContent = a;
        return;
    }

    result = Math.floor(operators[symbol](a, b) * 10000) / 10000;
    display.textContent = result;
    if (symbol === "/") {
        history.textContent = `${a} ${specialDivisionSymbol} ${b} = `;
    } else {
        history.textContent = `${a} ${symbol} ${b} = `;
    }
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
    if (dividedByZero) {
        clearCalc();
        dividedByZero = false;
    }

    if (display.textContent === `${result}`) {
        clearCalc();
    }

    let operators = ["+", "-", "*", `${specialDivisionSymbol}`];

    for (let operator of operators) {
        if (display.textContent === operator) {
            display.textContent = "";
        }
        continue;
    }

    let strNum = e.target.value;

    if (display.textContent === "0") {
        display.textContent = strNum;
    } else {
        display.textContent += strNum;
    }

    updateCurrentDisplayVal();
    return getValues();
}

function displaySymbol(e) {
    let operator = e.target.value;
    symbol = operator;

    if (operator === "/") {
        display.textContent = specialDivisionSymbol;
    } else {
        display.textContent = operator;
    }
    return symbol;
}

function displayDecimal(e) {
    let decimal = e.target.value;

    if (display.textContent.includes(`${decimal}`)) {
        return;
    }

    if (
        (display.textContent === "0" && !b) ||
        ((display.textContent === symbol ||
            display.textContent === specialDivisionSymbol) &&
            !b) ||
        ((display.textContent === symbol ||
            display.textContent === specialDivisionSymbol) &&
            result &&
            b &&
            a)
    ) {
        display.textContent = "";
        display.textContent += `${0}${decimal}`;
    } else {
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

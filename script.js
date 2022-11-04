const calcDisplay = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".all_clear");
const backspaceBtn = document.querySelector(".backspace");
const allOperators = document.querySelectorAll(".operator");

let currentDisplayValue = "";

function clearDisplay() {
    calcDisplay.textContent = "0";
    currentDisplayValue = "";
}

function deleteLastChar(event) {
    let displayLength = calcDisplay.textContent.length;
    let lastNum = calcDisplay.textContent[displayLength - 1];

    if (calcDisplay.textContent.length === 1) {
        calcDisplay.textContent = "0";
    } else {
        calcDisplay.textContent = calcDisplay.textContent.replace(lastNum, "");
    }
    currentDisplayValue = calcDisplay.textContent;
    console.log(currentDisplayValue);
    return currentDisplayValue;
}

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

function calculate(symbol, a, b) {
    return operators[symbol](a, b);
}

function displayNumbers(e) {
    if (calcDisplay.textContent === "0") {
        calcDisplay.textContent = e.target.value;
    } else {
        calcDisplay.textContent += e.target.value;
    }
    currentDisplayValue = calcDisplay.textContent;
    console.log(currentDisplayValue);
    return currentDisplayValue;
}

function displayOperator(e) {
    if (calcDisplay.textContent.includes(`${e.target.value}`)) return;
    else {
        calcDisplay.textContent += e.target.value;
    }
}

allNumbers.forEach((number) =>
    number.addEventListener("click", displayNumbers)
);
allOperators.forEach((operator) =>
    operator.addEventListener("click", displayOperator)
);
clearBtn.addEventListener("click", clearDisplay);
backspaceBtn.addEventListener("click", deleteLastChar);

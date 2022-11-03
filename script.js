const calcDisplay = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".all_clear");
const backspaceBtn = document.querySelector(".backspace");

let currentDisplayValue = "";

function clearDisplay() {
    calcDisplay.textContent = "0";
    currentDisplayValue = "";
}

function deleteLastDigit(event) {
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

function displayNumbers(event) {
    if (calcDisplay.textContent === "0") {
        calcDisplay.textContent = event.target.value;
    } else {
        calcDisplay.textContent += event.target.value;
    }
    currentDisplayValue = calcDisplay.textContent;
    console.log(currentDisplayValue);
    return currentDisplayValue;
}

allNumbers.forEach((number) =>
    number.addEventListener("click", displayNumbers)
);

// Clears the display and stored value memory
clearBtn.addEventListener("click", clearDisplay);

backspaceBtn.addEventListener("click", deleteLastDigit);

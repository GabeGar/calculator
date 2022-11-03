const calcDisplay = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".all_clear");

let currentDisplayValue = "";

function clearDisplay(event) {
    calcDisplay.textContent = "0";
    currentDisplayValue = "";
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

clearBtn.addEventListener("click", clearDisplay);

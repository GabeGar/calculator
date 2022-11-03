const calcDisplay = document.querySelector(".calculator_display");
const allNumbers = document.querySelectorAll(".number");

let currentDisplayValue = "";

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
    return currentDisplayValue;
}

allNumbers.forEach((number) =>
    number.addEventListener("click", displayNumbers)
);

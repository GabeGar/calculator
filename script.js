// Dictionary object of operators, which will be used as call back handler funcs.
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

// Calculate function that takes the symbol based on the button press (event listeners to be added),
// passes it in, along with two numbers, as parameters.

function calculate(symbol, a, b) {
    return operators[symbol](a, b);
}

// console.log(calculate("&times;", 2, 10));

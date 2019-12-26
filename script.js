// Vars

// Numbers

let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");
let btn6 = document.querySelector("#btn6");
let btn7 = document.querySelector("#btn7");
let btn8 = document.querySelector("#btn8");
let btn9 = document.querySelector("#btn9");
let btn0 = document.querySelector("#btn0");

// Operations

let btnAdd = document.querySelector("#btnAdd");
let btnSub = document.querySelector("#btnSub");
let btnMul = document.querySelector("#btnMul");
let btnDiv = document.querySelector("#btnDiv");
let btnEval = document.querySelector("#btnEval");
let btnClear = document.querySelector("#btnClear");

let display = document.querySelector("#display>p");

let displayNumber = "";

let calc = [];

let validNumbers = [1,2,3,4,5,6,7,8,9,0];
let validOperators = ["+","-","*","/"]

// Event Listeners

btn1.addEventListener("click", () => {
    addToDisplay(1);
});
btn2.addEventListener("click", () => {
    addToDisplay(2);
});
btn3.addEventListener("click", () => {
    addToDisplay(3);
});
btn4.addEventListener("click", () => {
    addToDisplay(4);
});
btn5.addEventListener("click", () => {
    addToDisplay(5);
});
btn6.addEventListener("click", () => {
    addToDisplay(6);
}); 
btn7.addEventListener("click", () => {
    addToDisplay(7);
});
btn8.addEventListener("click", () => {
    addToDisplay(8);
});
btn9.addEventListener("click", () => {
    addToDisplay(9);
});
btn0.addEventListener("click", () => {
    addToDisplay(0); 
});

btnAdd.addEventListener("click", () => {
    calcQueue(displayNumber, "+");
    updateDisplay("+")
});
btnSub.addEventListener("click", () => {
    calcQueue(displayNumber, "-");
    updateDisplay("-")
});
btnMul.addEventListener("click", () => {
    calcQueue(displayNumber, "*");
    updateDisplay("*")
});
btnDiv.addEventListener("click", () => {
    calcQueue(displayNumber, "/");
    updateDisplay("/")
});

btnEval.addEventListener("click", () => {
    if (!isNaN(displayNumber)) {
        calc.push(+displayNumber);
    }
    evaluate(calc);
});

btnClear.addEventListener("click", () => {
    clear();
});

window.addEventListener("keydown", function(e) {
    if (validNumbers.indexOf(Number(e.key)) !== -1) {
        addToDisplay(Number(e.key))
    }
    if (validOperators.indexOf(e.key) !== -1) {
        calcQueue(displayNumber, e.key);
        updateDisplay(e.key)
    }
    if (e.key === "=" || e.key === "Enter") {
        if (!isNaN(displayNumber)) {
            calc.push(+displayNumber);
        }
        evaluate(calc);
    }
});

// Functions

// Operations

function add(a,b)  {
    return a + b;
};

function subtract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function divide(a,b) {
    if (b === 0) {
        return "Nah, I don't really feel like it";
    }
    return a / b;
};


function operate(a,b,operation) {
    switch(operation) {
        case "+":
            return add(a,b);       

        case "-":
            return subtract(a,b);
        
        case "*":
            return multiply(a,b);

        case "/":
            return divide(a,b);
    };
};

function calcQueue(num, operator) {
    if (num === "") {
        calc[calc.length-1] = operator;
        return; 
    }
    if (num === "evaluated") {
        calc.push(operator);
        return;
    }
    calc.push(+num, operator);
    displayNumber = "";
    display.textContent = operator;
}

function evaluate(calc) {
    if (displayNumber === "evaluated") {return;}
    for (;calc.findIndex(checkIfMultiplyOrDivide) !== -1;) {
        position = calc.findIndex(checkIfMultiplyOrDivide);
        result = operate(calc[position-1],calc[position+1],calc[position]);
        if (isNaN(result)) {
            updateDisplay(result);
            return;
        };
        calc.splice(position-1,3);
        calc[position-1] = result;
    }
    for (let i = 2; i < calc.length;) {
        result = operate(calc[0],calc[2],calc[1])
        if (isNaN(result)) {
            updateDisplay(result);
            return;
        }
        calc.splice(0,3)
        calc.unshift(result)
    };
    updateDisplay(Number(calc))
    displayNumber = "evaluated"
};

function updateDisplay(str) {
    displayNumber = ""
    display.textContent = str; 
};

function addToDisplay(str) {
    if (displayNumber === "evaluated" || displayNumber.length > 20) {return;}
    displayNumber += str;
    display.textContent = displayNumber; 
}

function clear() {
    displayNumber = "";
    display.textContent = "0"; 
    calc = [];
};

function softClear() {
    calc = [];
    displayNumber = "";
}

function checkIfMultiplyOrDivide(str) {
    return str === "*" || str === "/"
}
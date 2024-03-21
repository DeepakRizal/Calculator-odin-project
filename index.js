const screen = document.querySelector(".input-screen");
const btn = document.querySelectorAll(".btn");
const clear = document.querySelector(".clear");
const equalsTo = document.querySelector(".equals-to");
const numberSign = document.querySelector(".btn-sign");
const percentage = document.querySelector(".percentage");

let operand1 = "";
let operand2 = "";
let operator = "";

//operations performing function
function add(f, s) {
  return f + s;
}

function subtract(f, s) {
  return f - s;
}

function multiply(f, s) {
  return f * s;
}

function divide(f, s) {
  return f / s;
}

//operate the equation
function operate(fnum, snum, optr) {
  if (optr === "+") {
    return add(fnum, snum);
  } else if (optr === "-") {
    return subtract(fnum, snum);
  } else if (optr === "/") {
    return divide(fnum, snum);
  } else if (optr === "*") {
    return multiply(fnum, snum);
  }
}

//populate the value on the calculator screen

function populate(button) {
  const buttonText = button.textContent;

  if (buttonText === "AC") {
    screen.value = "";
    operand1 = "";
    operand2 = "";
    operator = "";
  } else if (
    (buttonText === "*" ||
      buttonText === "-" ||
      buttonText === "/" ||
      buttonText === "+") &&
    operand1 !== "" &&
    operand2 !== "" &&
    operator !== ""
  ) {
    let result = operate(parseInt(operand1), parseInt(operand2), operator);
    screen.value = result;
    operand1 = result.toString();
    operand2 = "";
    operator = buttonText;
  } else if (buttonText === "+/-") {
    if (operand2 !== "") {
      operand2 = -parseFloat(operand2);
      screen.value = operand2;
    } else if (operand1 !== "") {
      operand1 = -parseFloat(operand1);
      screen.value = operand1;
    }
  } else if (buttonText === ".") {
    if (operand1 === "" || operand1 !== "") {
      operand1 += buttonText;
      screen.value = operand1;
    } else if (operand2 === "" || operand2 !== "") {
      operand2 += buttonText;
      screen.value = operand2;
    }
  } else {
    if (!isNaN(parseInt(buttonText))) {
      if (operator === "") {
        operand1 += buttonText;
        screen.value = operand1;
      } else {
        operand2 += buttonText;
        screen.value = operand2;
      }
    } else {
      if (buttonText !== "=") {
        operator = buttonText;
        screen.value = operator;
      }
    }
  }
}

// button clicked and populate result on the screen functionality
btn.forEach((btn) => {
  btn.addEventListener("click", function () {
    populate(btn);
  });
});

//show the resullt when the = button is clicked
equalsTo.addEventListener("click", function () {
  if (operand2 === "0" && operator === "/") {
    screen.value = "Warning! Always Infinity";
  } else if (operand1 !== "" && operand2 !== "") {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    let result;
    switch (operator) {
      case "+":
        result = add(num1, num2);
        break;
      case "-":
        result = subtract(num1, num2);
        break;
      case "/":
        result = divide(num1, num2);
        break;
      case "*":
        result = multiply(num1, num2);
        break;
      default:
        break;
    }

    screen.value = result;
    operand1 = result.toString();
    operand2 = "";
    operator = "";
  }
});

//Functionality to get a percentage value of a number
percentage.addEventListener("click", function () {
  if (operator === "%") {
    let result = parseInt(operand1) / 100;
    screen.value = result;
    operand1 = result.toString();
    operand2 = "";
    operator = "";
  }
});

// Function to simulate click on button
function simulateClick(button) {
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  button.dispatchEvent(event);
}

// Event listener for keydown event
document.addEventListener("keydown", function (event) {
  const key = event.key;

  const keyMappings = {
    0: document.querySelector(".btn-0"),
    1: document.querySelector(".btn-1"),
    2: document.querySelector(".btn-2"),
    3: document.querySelector(".btn-3"),
    4: document.querySelector(".btn-4"),
    5: document.querySelector(".btn-5"),
    6: document.querySelector(".btn-6"),
    7: document.querySelector(".btn-7"),
    8: document.querySelector(".btn-8"),
    9: document.querySelector(".btn-9"),
    "+": document.querySelector(".addtion"),
    "-": document.querySelector(".substraction"),
    "*": document.querySelector(".multiplication"),
    "/": document.querySelector(".division"),
    Enter: document.querySelector(".equals-to"),
    Escape: document.querySelector(".clear"),
  };

  if (keyMappings[key]) {
    simulateClick(keyMappings[key]);
  }
});

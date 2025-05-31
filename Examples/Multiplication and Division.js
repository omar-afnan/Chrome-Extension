/*
Write a JavaScript program to calculate multiplication and division of two numbers (input from the user).  
*/

function multiplication() {
  let num1 = parseFloat(document.getElementById("firstNumber").value);
  let num2 = parseFloat(document.getElementById("secondNumber").value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("result").innerHTML = "Please enter valid numbers.";
    return;
  }

  document.getElementById("result").innerHTML = num1 * num2;
}

function division() {
  let num1 = parseFloat(document.getElementById("firstNumber").value);
  let num2 = parseFloat(document.getElementById("secondNumber").value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("result").innerHTML = "Please enter valid numbers.";
    return;
  }

  if (num2 === 0) {
    document.getElementById("result").innerHTML = "Division by zero is not allowed.";
    return;
  }

  document.getElementById("result").innerHTML = num1 / num2;
}

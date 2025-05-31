
/*Write a JavaScript program to convert temperatures to and from Celsius, Fahrenheit.  
[ Formula : c/5 = (f-32)/9 [ where c = temperature in Celsius and f = temperature in Fahrenheit ]
Expected Output :
60°C is 140 °F
45°F is 7.222222222222222°C
*/
let temp = window.prompt("Enter the temperature ");
temp = Number(temp);
let weather = window.prompt(`Do you want the temp to be in Celsius (C) or Fahrenheit (F)?`);

if (weather === "C" || weather === "c") {
  let fahrenheit = (temp * 9 / 5) + 32;
  console.log(`The temp in Fahrenheit is ${fahrenheit}`);
} else if (weather === "F" || weather === "f") {
  let celsius = (temp - 32) * 5 / 9;
  console.log(`The temp in Celsius is ${celsius}`);
}
else {
  window.prompt("invalid input ");
}

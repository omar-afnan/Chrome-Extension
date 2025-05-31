// 1. Grab the box from the DOM and store it in a variable
// 2. Add a click event listener to the box 
// 3. Log out "I want to open the box!" when it's clicked



let box = document.getElementById("box");
box.addEventListener("click", function()
  {
  console.log("I want to open the box!");
  }
)



const container = document.getElementById("container");
container.innerHTML = "<button onclick='buy()'>Buy-Now!!!!!!</button>"

// When clicked, render a paragraph under the button (in the container)
// that says "Thank you for buying!"

function buy()
{
  container.innerHTML = "<p> Thank u for buying </p>" 
}




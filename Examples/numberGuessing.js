const minNum = 1;
const maxNumber = 1000;

const answer = Math.floor(Math.random() * (maxNumber - minNum + 1) + minNum);

let userAttempts = 0; 
let guess; 
let running = true;

while (running) {
    guess = Number(window.prompt(`Enter your guess between ${minNum} and ${maxNumber}:`));
    
    // Check if input is a valid number
    if (isNaN(guess)) {
        window.alert("Please enter a valid number.");
        continue; // Skip to the next iteration of the loop
    }
    
    // Check if the number is within range
    if (guess < minNum || guess > maxNumber) {
        window.alert(`Please enter a number between ${minNum} and ${maxNumber}.`);
        continue; // Skip to the next iteration of the loop
    }
    
    userAttempts++; // Increment attempts
    
    // Check if the guess is too low, too high, or correct
    if (guess < answer) {
        window.alert("The number is too low.");
    } else if (guess > answer) {
        window.alert("The number is too high.");
    } else {
        window.alert(`Correct! The answer was ${answer}. It took you ${userAttempts} attempts.`);
        running = false; // End the game
    }
}

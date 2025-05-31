//  Import Firebase modules for app initialization and database access
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, push , onValue , remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

//  Firebase configuration object
const firebaseConfig = {
    databaseURL: "https://chromeextension-f0094-default-rtdb.asia-southeast1.firebasedatabase.app"
}


//  Initialize Firebase app with the config
const app = initializeApp(firebaseConfig)

//  Get a reference to the Realtime Database
const database = getDatabase(app)

//  Set a reference path to store leads under "leads" node in Firebase
const referenceInDB = ref(database, "leads")

//  Create an empty array to temporarily store leads in memory
let myLeads = []

//  Get references to all necessary DOM elements
const inputEl = document.getElementById("input-el")         // Input field for manual lead entry
const inputBtn = document.getElementById("input-btn")       // Button to save input
const ulEl = document.getElementById("ul-el")               // Unordered list to display leads
const deleteButton = document.getElementById("del-button")  // Button to delete all leads
const BookMarkBtn = document.getElementById("tab-btn")      // Button to save the current browser tab

//  Event listener for the "Save Input" button
inputBtn.addEventListener("click", function() {
    const value = inputEl.value.trim()  // Get the value and remove extra spaces
    if (value !== "") {
        push(referenceInDB, inputEl.value)      // Push the value into Firebase database
        inputEl.value = ""              // Clear the input field
    }
})

//  Event listener for the "Delete" button
deleteButton.addEventListener("click", function () {
    // Challenge: Import the 'remove' function and call it here to delete the leads
    remove(referenceInDB); // Remove all leads from the Firebase database
   ulEl.innerHTML = ""; // Clear the displayed list

})

//  Event listener for the "Save Tab" button (uses Chrome Extension API)
BookMarkBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url           // Get the URL of the current active tab
        myLeads.push(url)                // Save it to the array
        localStorage.setItem("myLeads", JSON.stringify(myLeads))  // Update localStorage
        render(myLeads)                  // Render the updated list
    })
})

// Challenge: Log out a snapshot of your database when a new value is added to it

onValue(referenceInDB, function (snapshot) {
    //  console.log(snapshot.val()); // snapshot.val contains the values 

    const snapshotExists = snapshot.exists();

    if (snapshotExists)
    {
    const snapshotValues = snapshot.val(); // snapshot.val contains the values 
        const leads = Object.value(snapshotValues); // Convert the snapshot values to an array
        

    // Challenge: Use the render function with 'leads' to render the leads in the app
        render(leads); // Render the leads in the app
        
    }
  
});



//  Function to render a list of leads to the page
function render(leads) {
    if (!Array.isArray(leads)) return   // Safety check: only process if input is an array

    let listItems = ""  // String to accumulate list item HTML

    // Loop through each lead and create a list item with a clickable link
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }

    // Inject the HTML into the ul element on the page
    ulEl.innerHTML = listItems
}

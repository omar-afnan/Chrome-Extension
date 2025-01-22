// Initialize as an empty array to store leads
let myLeads = [];

// Grab the input field and assign it to inputEl
const inputEl = document.getElementById("input-el");

// Grab the "Save Input" button and assign it to inputBtn
const inputBtn = document.getElementById("input-btn");

// Grab the unordered list (ul) element and assign it to ulEl
const ulEl = document.getElementById("ul-el");

// Store the delete button in a deleteButton variable
const deleteButton = document.getElementById("del-button");

// Retrieve the leads stored in localStorage and parse them back into a JavaScript array
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Grab the "Save Tab" button and assign it to BookMarkBtn
const BookMarkBtn = document.getElementById("tab-btn");

// Add an event listener to the "Save Tab" button
BookMarkBtn.addEventListener("click", function () {
    // Use the Chrome Tabs API to get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Save the URL of the current tab into myLeads
        myLeads.push(tabs[0].url); // Grab the URL of the active tab

        // Save the updated myLeads array to localStorage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));

        // Render the updated leads list in the unordered list
        render(myLeads);
    });
});

// Check if leadsFromLocalStorage contains any data (i.e., it is not null)
// If it does, update myLeads with the stored data and render the leads on the page
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage; // Update myLeads array with stored data
    render(myLeads); // Render the stored leads in the list
}

// Add an event listener to the "Save Input" button
// When clicked, save the user input into myLeads and update localStorage
inputBtn.addEventListener("click", function () {
    // Check if the input field is not empty or whitespace
    if (inputEl.value.trim() !== "") {
        // Push the user-entered value into the myLeads array
        myLeads.push(inputEl.value);

        // Clear the input field after saving the value
        inputEl.value = "";

        // Save the updated myLeads array to localStorage
        localStorage.setItem("myLeads", JSON.stringify(myLeads));

        // Render the updated leads list in the unordered list
        render(myLeads);
    }
});

// Function to render the leads list on the page
function render(leads) {
    // Check if the provided leads parameter is an array
    if (!Array.isArray(leads)) return; // Exit the function if not an array

    // Create a variable to hold the HTML for the list items
    let listItems = "";

    // Loop through the leads array and create list items with anchor tags for each lead
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]} <!-- Display the lead URL -->
                        </a>
                      </li>`; // Append the lead as an anchor tag within an <li> element
    }

    // Insert the list items into the unordered list (ulEl) on the page
    ulEl.innerHTML = listItems;
}

// Add an event listener to the Delete button
// When clicked, clear all leads from localStorage and reset the list
deleteButton.addEventListener("click", function () {
    // Clear all data stored in localStorage
    localStorage.clear();

    // Reset the myLeads array to an empty array
    myLeads = [];

    // Render an empty list on the page (clearing the existing list)
    render(myLeads);
});

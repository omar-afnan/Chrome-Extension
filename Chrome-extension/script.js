// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
    databaseURL: "https://chromeextension-f0094-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

// DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteButton = document.getElementById("del-button");
const BookMarkBtn = document.getElementById("tab-btn");

// Save Input to Firebase
inputBtn.addEventListener("click", function () {
    const value = inputEl.value.trim();
    if (value !== "") {
        push(referenceInDB, value);
        inputEl.value = "";
    }
});

// Delete all leads from Firebase
deleteButton.addEventListener("click", function () {
    remove(referenceInDB);        // Deletes from Firebase
    ulEl.innerHTML = "";          // Clears from UI
});

// Save current tab to Firebase (NOT localStorage)
BookMarkBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;
        push(referenceInDB, url);   // ✅ Save directly to Firebase
    });
});

// Listen to changes in Firebase and update UI
onValue(referenceInDB, function (snapshot) {
    if (snapshot.exists()) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);  // ✅ FIXED typo here
        render(leads);
    } else {
        ulEl.innerHTML = "";  // If no data, clear the UI
    }
});

// Render leads to the page
function render(leads) {
    if (!Array.isArray(leads)) return;

    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`;
    }
    ulEl.innerHTML = listItems;
}
 

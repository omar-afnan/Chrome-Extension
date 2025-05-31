import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase , ref , push } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://chromeextension-f0094-default-rtdb.asia-southeast1.firebasedatabase.app/"
}  // use yoyur own firebase config here

// using push in the top to push data
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database , "birthdays")  // reference to the "birthdays" node in the database
// referenceInDB is a reference to the "birthdays" node in the database

const birthdayInputField = document.getElementById("birthday-input")
const submitButton = document.getElementById("submit-button")

submitButton.addEventListener("click", function() {
    push(referenceInDB  ,birthdayInputField.value)
    birthdayInputField.value = ""
})

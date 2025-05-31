import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://chromeextension-f0094-default-rtdb.asia-southeast1.firebasedatabase.app/leads"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "products")

const productNameInputField = document.getElementById("product-name-input")
const productValueInputField = document.getElementById("product-value-input")
const submitButton = document.getElementById("submit-button")

onValue(referenceInDB, function (snapshot)
{
  console.log(snapshot);
  }
)

submitButton.addEventListener("click", function() {
    productNameInputField.value
    push(referenceInDB, productNameInputField.value)
    productNameInputField.value = ""
})

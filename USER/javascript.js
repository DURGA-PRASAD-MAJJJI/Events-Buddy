import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqHY6r_q96RZqeDooSFzthmxxWQrcUgqs",
  authDomain: "sports-buddy-eab63.firebaseapp.com",
  databaseURL: "https://sports-buddy-eab63-default-rtdb.firebaseio.com",
  projectId: "sports-buddy-eab63",
  storageBucket: "sports-buddy-eab63.appspot.com",
  messagingSenderId: "49982895548",
  appId: "1:49982895548:web:b7ad502f9177abc6bf67b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Load SweetAlert2 library
const loadSweetAlert = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  document.head.appendChild(script);
};
loadSweetAlert();

// Get submit button
const submit = document.getElementById("submit");

// Ensure submit button exists before adding event listener
if (submit) {
  submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Get user input values inside the event listener
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill in all fields!",
        icon: "warning",
        confirmButtonColor: "#ce9adb"
      });
      return;
    }

    Swal.fire({
      title: "Processing...",
      text: "Creating your account...",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.fire({
          title: "Account Created!",
          text: "Redirecting to login...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "login1.html";
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#dc3545"
        });
      });
  });
} else {
  console.error("Submit button not found. Check your HTML.");
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

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
const database = getDatabase(app);
const sportsbuddyBD = ref(database, "sports buddy");

// Load SweetAlert2 for beautiful alerts
const loadSweetAlert = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  document.head.appendChild(script);
};
loadSweetAlert();

document.getElementById("registerForm").addEventListener("submit", submitForm);

// Form submit handler
function submitForm(e) {
  e.preventDefault();
  const email = getElementVal('email');
  const password = getElementVal('password');
  
  // Save user info to Firebase
  saveinfo(email, password);

  // Beautiful success alert
  Swal.fire({
    title: "Account Registered!",
    text: "Your account has been created successfully.",
    icon: "success",
    confirmButtonText: "Continue",
    confirmButtonColor: "#4CAF50", // Custom green button color
  });
}

// Save user data to Firebase Realtime Database
const saveinfo = (email, password) => {
  const newUser = push(sportsbuddyBD);
  set(newUser, {
    email: email,
    password: password,
  });
};

// Utility function to get form element values
const getElementVal = (id) => {
  return document.getElementById(id).value;
}

// Login handler with beautiful alerts
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        title: "Logging In",
        text: "Welcome back! Redirecting to homepage...",
        icon: "info",
        timer: 2000, 
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "HOMEPAGE2.html";
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    });
});

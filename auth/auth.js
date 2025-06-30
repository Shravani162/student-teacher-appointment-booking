import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9ByaUclwsFKmf6JD8LBK4142oplIYBCA",
  authDomain: "studentteacherbooking-a7491.firebaseapp.com",
  projectId: "studentteacherbooking-a7491",
  storageBucket: "studentteacherbooking-a7491.appspot.com",
  messagingSenderId: "145123809437",
  appId: "1:145123809437:web:a5852e26bdec41370cdc74"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Login Form Handler
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const selectedRole = document.getElementById("role").value;
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = "";

  try {
    // Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role and name from Firestore
    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    const userData = userDoc.data();

    // Check selected role vs registered role
    if (userData.role !== selectedRole) {
      throw new Error(`You're registered as '${userData.role}', not '${selectedRole}'.`);
    }

    // ✅ Save user name in localStorage
    localStorage.setItem("adminName", userData.name); // assuming the Firestore doc has a 'name' field

    // ✅ Redirect based on role
    if (selectedRole === "teacher") {
      window.location.href = "../teacher/teacher.html";
    } else if (selectedRole === "admin") {
      window.location.href = "../admin/admin.html";
    } else {
      throw new Error("Invalid role selection.");
    }

  } catch (error) {
    console.error(error);
    errorDiv.innerText = error.message;
  }
});

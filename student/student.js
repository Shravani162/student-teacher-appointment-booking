// student.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9ByaUclwsFKmf6JD8LBK4142oplIYBCA",
  authDomain: "studentteacherbooking-a7491.firebaseapp.com",
  projectId: "studentteacherbooking-a7491",
  storageBucket: "studentteacherbooking-a7491.appspot.com",
  messagingSenderId: "145123809437",
  appId: "1:145123809437:web:a5852e26bdec41370cdc74"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fetch and display student name
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDoc = await getDoc(doc(db, "students", uid));

    if (userDoc.exists()) {
      const studentData = userDoc.data();
      const title = document.querySelector('.dashboard-title');
      if (title) {
        title.textContent = `Welcome, ${studentData.name}!`;
      }
    } else {
      console.log("No such student found in database.");
    }
  } else {
    // Redirect to login if not authenticated
    window.location.href = "../login.html";
  }
});

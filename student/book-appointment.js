import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9ByaUclwsFKmf6JD8LBK4142oplIYBCA",
  authDomain: "studentteacherbooking-a7491.firebaseapp.com",
  projectId: "studentteacherbooking-a7491",
  storageBucket: "studentteacherbooking-a7491.appspot.com",
  messagingSenderId: "145123809437",
  appId: "1:145123809437:web:a5852e26bdec41370cdc74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;
  const teacherName = document.getElementById("teacherName").value;
  const requestedDate = document.getElementById("requestedDate").value;
  const message = document.getElementById("message").value;

  await addDoc(collection(db, "appointment_requests"), {
    studentName,
    studentEmail,
    teacherName,
    requestedDate,
    message,
    status: "pending"
  });

  alert("Appointment request submitted!");
  e.target.reset();
});

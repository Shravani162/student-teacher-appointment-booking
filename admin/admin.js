import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9ByaUclwsFKmf6JD8LBK4142oplIYBCA",
  authDomain: "studentteacherbooking-a7491.firebaseapp.com",
  projectId: "studentteacherbooking-a7491"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("addTeacherForm");
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const department = document.getElementById("department").value.trim();
    const subject = document.getElementById("subject").value.trim();

    try {
      await addDoc(collection(db, "teachers"), { name, department, subject });
      msg.innerText = "✅ Teacher added successfully!";
      msg.style.color = "green";
      form.reset();
    } catch (err) {
      msg.innerText = "❌ Error: " + err.message;
      msg.style.color = "red";
    }
  });
}

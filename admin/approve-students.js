import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const db = getFirestore(app);

// ✅ HTML Elements
const tableBody = document.getElementById("pendingStudentsBody");
const statusDiv = document.getElementById("status");

// ✅ Load Pending Students from Firestore
async function loadPendingStudents() {
  try {
    const snapshot = await getDocs(collection(db, "pending_students"));
    tableBody.innerHTML = "";

    if (snapshot.empty) {
      tableBody.innerHTML = `<tr><td colspan="4">No pending student registrations.</td></tr>`;
      return;
    }

    snapshot.forEach((docSnap) => {
      const student = docSnap.data();
      const id = docSnap.id;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${escapeHtml(student.name)}</td>
        <td>${escapeHtml(student.email)}</td>
        <td>${escapeHtml(student.course || 'N/A')}</td>
        <td>
          <button class="approve-btn" 
                  data-id="${id}" 
                  data-name="${student.name}" 
                  data-email="${student.email}" 
                  data-course="${student.course || ''}">
            ✅ Approve
          </button>
          <button class="reject-btn" data-id="${id}">❌ Reject</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    addEventListeners();

  } catch (error) {
    console.error("Error loading pending students:", error);
    statusDiv.innerText = "⚠️ Error loading pending students.";
  }
}

// ✅ Escape HTML (Security)
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ✅ Add Event Listeners to Approve and Reject Buttons
function addEventListeners() {
  // Approve
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const email = btn.dataset.email;
      const course = btn.dataset.course;

      try {
        // ➕ Add to 'students' collection
        await addDoc(collection(db, "students"), {
          name,
          email,
          course,
          role: "student",
          approvedAt: new Date()
        });

        // ➕ Add to 'users' collection (using same ID as pending student)
        await setDoc(doc(db, "users", id), {
          name,
          email,
          role: "student",
          createdAt: new Date()
        });

        // ❌ Delete from 'pending_students'
        await deleteDoc(doc(db, "pending_students", id));

        alert("✅ Student approved!");
        loadPendingStudents();
      } catch (err) {
        console.error("Error approving student:", err);
        alert("⚠️ Error approving student.");
      }
    });
  });

  // Reject
  document.querySelectorAll(".reject-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      try {
        await deleteDoc(doc(db, "pending_students", id));
        alert("❌ Student rejected.");
        loadPendingStudents();
      } catch (err) {
        console.error("Error rejecting student:", err);
        alert("⚠️ Error rejecting student.");
      }
    });
  });
}

// ✅ Initial Load
loadPendingStudents();

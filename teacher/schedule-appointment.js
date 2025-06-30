import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
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

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM container
const container = document.getElementById("appointmentsContainer");

// Load and display appointment requests
async function loadAppointments() {
  const snapshot = await getDocs(collection(db, "appointment_requests"));
  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted">
        <p>No appointment requests found.</p>
      </div>
    `;
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${data.studentName}</h5>
          <p><strong>Email:</strong> ${data.studentEmail}</p>
          <p><strong>Date Requested:</strong> ${data.requestedDate}</p>
          <p><strong>Message:</strong> ${data.message || "—"}</p>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-approve">✅ Approve</button>
            <button class="btn btn-delete">❌ Delete</button>
          </div>
        </div>
      </div>
    `;

    const approveBtn = card.querySelector(".btn-approve");
    const deleteBtn = card.querySelector(".btn-delete");

    approveBtn.addEventListener("click", async () => {
      try {
        await updateDoc(doc(db, "appointment_requests", docSnap.id), {
          status: "approved"
        });
        alert("✅ Appointment approved!");
        card.remove();
      } catch (error) {
        console.error("Approval error:", error);
        alert("Failed to approve appointment.");
      }
    });

    deleteBtn.addEventListener("click", async () => {
      try {
        await deleteDoc(doc(db, "appointment_requests", docSnap.id));
        alert("🗑️ Appointment deleted!");
        card.remove();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete appointment.");
      }
    });

    container.appendChild(card);
  });
}

loadAppointments();

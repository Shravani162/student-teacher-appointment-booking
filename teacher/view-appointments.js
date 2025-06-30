import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
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

const container = document.getElementById("appointmentsContainer");

async function loadAppointments() {
  // Fetch all appointments (without filtering by teacher's email)
  const q = query(
    collection(db, "appointment_requests"),
    orderBy("requestedDate", "desc") // Sorting by requestedDate (descending order)
  );

  try {
    const snapshot = await getDocs(q);
    container.innerHTML = ""; // Clear any previous appointments

    let found = false;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      console.log('Appointment data:', data);

      found = true;

      const card = document.createElement("div");
      card.className = "col-md-6";

      card.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${data.studentName}</h5>
            <p class="card-text"><strong>Email:</strong> ${data.studentEmail}</p>
            <p class="card-text"><strong>Requested Date:</strong> ${data.requestedDate}</p>
            <p class="card-text"><strong>Message:</strong> ${data.message || "No message"}</p>
            <p class="card-text"><strong>Status:</strong> 
              <span class="badge ${data.status === "approved" ? "bg-success" : "bg-warning text-dark"}">
                ${data.status || "pending"}
              </span>
            </p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // If no appointments are found
    if (!found) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          <p>No appointment requests found.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

loadAppointments();

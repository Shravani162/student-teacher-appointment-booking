📚 Student-Teacher Booking Appointment System
A web-based appointment scheduling system designed to streamline communication and appointment booking between students and teachers. The platform is built using HTML, CSS, JavaScript, and Firebase, and supports scheduling, messaging, and administrative controls.


🚀 Features
👨‍🎓 Student
1. Register and log in
2. Search for teachers by name, department, or subject
3. Book an appointment with selected teacher
4. Send a message along with the booking (e.g., purpose and timing)
5. View and manage appointments


👨‍🏫 Teacher
1. Register and log in
2. View and manage student appointments
3. Approve or cancel appointment requests
4. Receive and respond to messages

🛠️ Admin
1. Add, update, or delete teacher profiles
2. Approve student registrations
3. View all appointments and logs

🧱 System Architecture
Frontend: HTML, CSS, JavaScript
Backend/Database: Firebase (Firestore for data, Auth for authentication)
Hosting: Firebase Hosting or any cloud platform
Authentication: Firebase Auth for secure login/registration
Logging: JavaScript-based logging for all actions performed by users


📦 Modules
auth.js – Authentication and user session handling
appointment.js – Booking, approval, and cancellation logic
admin.js – Admin panel for managing users and teachers
firebase-config.js – Firebase initialization
logging.js – JavaScript logging wrapper to log all user activities
styles.css – Styling and layout
index.html, login.html, dashboard.html, etc.


🛠️ Technologies Used
HTML5 / CSS3
JavaScript 
Firebase (Auth, Firestore, Hosting)
Git & GitHub (for version control)


⚙️ How to Run
1. Clone the repo:
 git clone https://github.com/Shravani162/student-teacher-appointment-booking.git
 cd Student_Teacher_booking_appointment

2. Setup Firebase:
Create a Firebase project.
Enable Authentication and Firestore Database.
Replace the Firebase config in firebase-config.js with your credentials.

3. Start development server:
Use a local server (e.g., Live Server in VS Code) to open index.html.

🚀 To Login
1. As admin:
   Username:- admin@gmail.com
   Password:- admin@16
2. As teacher:
   Username:- abc@gmail.com
   Password:- teacher@16
3. As student:
   Username:- user@gmail.com
   Password:- student@16

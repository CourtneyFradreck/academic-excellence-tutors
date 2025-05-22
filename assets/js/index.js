// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVNpsQJ7uj7hxDmG6VNNpzFHJMhAh-WsY",
  authDomain: "academic-excellence-tutors.firebaseapp.com",
  projectId: "academic-excellence-tutors",
  storageBucket: "academic-excellence-tutors.firebasestorage.app",
  messagingSenderId: "244333691365",
  appId: "1:244333691365:web:b1aa417eaadac8b656af0c",
  measurementId: "G-T4LRYG90M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get form elements
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const nextBtn = document.getElementById('nextBtn');

  form.addEventListener('submit', async (e) => {  // Change to form submit event
    e.preventDefault();  // Prevent default form submission

    // Validate form
    if (!form.checkValidity()) {
      alert("Please fill in all required fields");
      return;
    }

    //get form data
    const enrollmentData = {
      fullName: document.getElementById('name').value,
      dateOfBirth: new Date(document.getElementById('dob').value),
      email: document.getElementById('email').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      school: document.getElementById('nameOfSchool').value,
      gender: document.querySelector('input[name="gender"]:checked')?.value || '',
      parentGuardianDetails: {
        motherName: document.getElementById('motherName').value,
        motherNumber: document.getElementById('motherNumber').value,
        fatherName: document.getElementById('fatherName').value,
        fatherNumber: document.getElementById('fatherNumber').value,
        guardianName: document.getElementById('guardianName').value,
        guardianNumber: document.getElementById('guardianNumber').value
      }
    };

    try {
      // Show loading state
      nextBtn.disabled = true;
      nextBtn.textContent = 'Submitting...';

      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "enrollments"), enrollmentData);
      console.log("Document written with ID: ", docRef.id);
      alert("Enrollment data submitted successfully!");
      form.reset();

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error submitting enrollment data. Please try again.");
    } finally {
      // Reset button state
      nextBtn.disabled = false;
      nextBtn.textContent = 'Next';
    }
  });
});
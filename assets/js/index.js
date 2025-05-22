  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
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

  console.log(firebase);
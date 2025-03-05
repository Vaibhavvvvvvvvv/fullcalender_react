// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_GnwgfG5h8ht1aP5ZaJnEhH2Bc9mO5cE",
  authDomain: "fullcalendar-e4d75.firebaseapp.com",
  projectId: "fullcalendar-e4d75",
  storageBucket: "fullcalendar-e4d75.firebasestorage.app",
  messagingSenderId: "489122876112",
  appId: "1:489122876112:web:40dc7990a0764001106cd5",
  measurementId: "G-5KP7VNSC72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
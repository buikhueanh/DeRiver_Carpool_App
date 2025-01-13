// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEOLg60PLLf34dQ87qpFK3ACeC26EnoP0",
  authDomain: "deriver-carpool.firebaseapp.com",
  projectId: "deriver-carpool",
  storageBucket: "deriver-carpool.firebasestorage.app",
  messagingSenderId: "323387170782",
  appId: "1:323387170782:web:136c53965757db44e6074f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

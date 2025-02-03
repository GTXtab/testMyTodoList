// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBOlm2tnr_NxCodVmNlJF2cca43ucKCPA",
  authDomain: "mytodolist-1bc6f.firebaseapp.com",
  projectId: "mytodolist-1bc6f",
  storageBucket: "mytodolist-1bc6f.firebasestorage.app",
  messagingSenderId: "953487823874",
  appId: "1:953487823874:web:444a3f46133608f317431b",
  measurementId: "G-Y4H34PPDDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
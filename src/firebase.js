// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKyjGQEiYOuZ3AWGpSdD49cLzMML3PtIA",
  authDomain: "vintage-f4c36.firebaseapp.com",
  projectId: "vintage-f4c36",
  storageBucket: "vintage-f4c36.appspot.com",
  messagingSenderId: "267946662621",
  appId: "1:267946662621:web:2ffea16e3eff8c7ef4d934",
  measurementId: "G-M5H1XGS3KE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
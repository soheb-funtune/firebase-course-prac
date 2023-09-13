// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPjho14w38-jxqlPYQyyLojCZm3miN2zo",
  authDomain: "fir-couse-a7520.firebaseapp.com",
  projectId: "fir-couse-a7520",
  storageBucket: "fir-couse-a7520.appspot.com",
  messagingSenderId: "876431803615",
  appId: "1:876431803615:web:03fa3447741946c6ed556a",
  measurementId: "G-L7EMNGVY81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

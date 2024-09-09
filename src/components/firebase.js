import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC94QY-7UQ0mIXpRiKaUntKmh9of3FDcFc",
  authDomain: "treasure--currency-app.firebaseapp.com",
  projectId: "treasure--currency-app",
  storageBucket: "treasure--currency-app.appspot.com",
  messagingSenderId: "557087104357",
  appId: "1:557087104357:web:588a4e939d6448138ad58c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
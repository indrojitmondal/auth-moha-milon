// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDigLBTXht1YUVyHPsxH98EOr2EiE673AM",
  authDomain: "auth-moha-milon-aad56.firebaseapp.com",
  projectId: "auth-moha-milon-aad56",
  storageBucket: "auth-moha-milon-aad56.firebasestorage.app",
  messagingSenderId: "248363836457",
  appId: "1:248363836457:web:c19a9fcc124fa21771a838"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
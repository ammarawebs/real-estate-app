// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2995a.firebaseapp.com",
  projectId: "mern-estate-2995a",
  storageBucket: "mern-estate-2995a.appspot.com",
  messagingSenderId: "359729399684",
  appId: "1:359729399684:web:b5642fa7d174d072243fd1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
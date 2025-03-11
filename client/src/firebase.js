// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bb186.firebaseapp.com",
  projectId: "mern-blog-bb186",
  storageBucket: "mern-blog-bb186.firebasestorage.app",
  messagingSenderId: "806140129906",
  appId: "1:806140129906:web:8253db0e9b03cf9acf08eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
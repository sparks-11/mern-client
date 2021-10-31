// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFGShF7ZP1Dl1YH6dXu6DmhFyJ6UdMOqU",
  authDomain: "dolphin-polymers.firebaseapp.com",
  projectId: "dolphin-polymers",
  storageBucket: "dolphin-polymers.appspot.com",
  messagingSenderId: "606239517144",
  appId: "1:606239517144:web:ab9e95de3aa2f7abf7eaad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
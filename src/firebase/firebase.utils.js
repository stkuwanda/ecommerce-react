// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASlvXVhIo7pSiISxPWD7YscsWPFcYuFLI",
  authDomain: "ecommerce-react-2b5ab.firebaseapp.com",
  projectId: "ecommerce-react-2b5ab",
  storageBucket: "ecommerce-react-2b5ab.appspot.com",
  messagingSenderId: "731862564917",
  appId: "1:731862564917:web:0cedf2b87815d79657717c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize DB
export const firestore = getFirestore(app);

// Initialize Auth Service
export const auth = getAuth(app);

// Setup Google popup for sign up
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

// Sign In with Google
export const signInWithGoogle = () => signInWithPopup(auth, provider);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  addDoc,
  deleteDoc,
  deleteField,
  getDoc,
  getDocs,
  documentId,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
provider.setCustomParameters({ prompt: "select_account" });

// Sign In with Google
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.log(err, "An error occurred.");
  }
};

// Create A User Profile Document
export const createUserProfileDocument = async (userAuth, otherData) => {
  console.log('createUserProfileDocument running...');
  if (!userAuth) return;
  try {
    const docRef = doc(firestore, `/users/${userAuth.uid}`);
    const snapShotRef = await getDoc(docRef);
    console.log("DocRef result:", docRef);
    console.log("Snapshot result", snapShotRef);

    if (!snapShotRef.exists()) {
      let { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        console.log(
          "line 68, firebase.utils.js, createUserProfileDocument(), displayName",
          displayName
        );
        console.log(
          "line 69, firebase.utils.js, createUserProfileDocument(), otherData",
          otherData
        );

        await setDoc(docRef, { displayName, email, createdAt, ...otherData });
      } catch (err) {
        console.log(
          "line 70, firebase.utils.js, createUserProfileDocument(), Error saving new user to firebase",
          err.message
        );
      }
    }

    return docRef;
  } catch (err) {
    console.log(err);
  }
};

// Export onSnapShot To Receive Latest Data of a DocumentRef
export { onSnapshot, createUserWithEmailAndPassword };

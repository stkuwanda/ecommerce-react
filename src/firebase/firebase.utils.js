// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  collection,
  writeBatch,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Sign In with Google
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log(err, "An error occurred.");
    }
    alert("An error occurred during this operation!");
  }
};

// Create A User Profile Document
export const createUserProfileDocument = async (userAuth, otherData) => {
  if (process.env.NODE_ENV === "development") {
    console.log("createUserProfileDocument running...");
  }

  if (!userAuth) return;
  
  try {
    const docRef = doc(firestore, `/users/${userAuth.uid}`);
    const snapShotRef = await getDoc(docRef);

    if (process.env.NODE_ENV === "development") {
      console.log("DocRef result:", docRef);
      console.log("Snapshot result", snapShotRef);
    }

    if (!snapShotRef.exists()) {
      let { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 79, firebase.utils.js, createUserProfileDocument(), displayName",
            displayName
          );
          console.log(
            "line 83, firebase.utils.js, createUserProfileDocument(), otherData",
            otherData
          );
        }

        await setDoc(docRef, { displayName, email, createdAt, ...otherData });
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 91, firebase.utils.js, createUserProfileDocument(), Error saving new user to firebase",
            err.message
          );
        }

        alert("An unexpected error occurred during this operation!");
      }
    }

    return docRef;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
    }
    
    alert("An unexpected error occurred during this operation");
  }
};

// Function to load products into Firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);
  const writeBatchObject = writeBatch(firestore);

  if (process.env.NODE_ENV === "development") {
    console.log(
      "line 118, firebase.utils.js, addCollectionAndDocuments, CollectionReference Object:",
      collectionRef
    );
  }

  if (objectsToAdd) {
    objectsToAdd.forEach((obj) => {
      const docRef = doc(collectionRef);
      writeBatchObject.set(docRef, obj);
    });

    return await writeBatchObject.commit();
  }
};

// Function to get collections data from firestore into the app
export const convertCollectionsSnapshotToMap = (collectonsSnapshot) => {
  const transformedCollectionsList = collectonsSnapshot.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      items,
      title,
    };
  });

  if (process.env.NODE_ENV === "development") {
    console.log(
      "line 148, firebase.utils.js, convertCollectionsSnapshotToMap, Collections List:",
      transformedCollectionsList
    );
  }

  return transformedCollectionsList.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

// To be used to check validity of a user's authentication
export const getCurrentAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

// Reexport Utility Functions
export {
  onSnapshot,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  getDocs,
  getDoc,
  signInWithPopup,
};

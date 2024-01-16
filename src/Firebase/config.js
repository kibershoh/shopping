import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyBIr-FA-_IQFBdJpAlJyr3Qtox2Id8MJRQ",
  authDomain: "shopping-791be.firebaseapp.com",
  projectId: "shopping-791be",
  storageBucket: "shopping-791be.appspot.com",
  messagingSenderId: "313102473698",
  appId: "1:313102473698:web:4fff9c6d31f1c7680201bb"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;
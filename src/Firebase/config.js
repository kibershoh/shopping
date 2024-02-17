import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {

 apiKey: "AIzaSyDSRiIMdDTHeaGMZyY068dva000-1AcHuU",
  authDomain: "shop-95504.firebaseapp.com",
  projectId: "shop-95504",
  storageBucket: "shop-95504.appspot.com",
  messagingSenderId: "1026779474318",
  appId: "1:1026779474318:web:93d2f2a320a55e83531cdf"
// ~~~~~~~~ Team accauntniki~~~~~~~~~~~~//
// apiKey: "AIzaSyBIr-FA-_IQFBdJpAlJyr3Qtox2Id8MJRQ",
//   authDomain: "shopping-791be.firebaseapp.com",
//   projectId: "shopping-791be",
//   storageBucket: "shopping-791be.appspot.com",
//   messagingSenderId: "313102473698",
//   appId: "1:313102473698:web:4fff9c6d31f1c7680201bb"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;
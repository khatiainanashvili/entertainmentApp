import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyA_4pCTtZvdZpuze1JMdhZVxwCwaZMs_Ko",
  authDomain: "movie-app-3801e.firebaseapp.com",
  projectId: "movie-app-3801e",
  storageBucket: "movie-app-3801e.appspot.com",
  messagingSenderId: "616347280699",
  appId: "1:616347280699:web:6f36dcea7f547bff77c31e",
  measurementId: "G-2YXQ6WF8YD"
};



const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

const app = initializeApp(firebaseConfig)
const db = getFirestore(app) 

export { firebaseApp, analytics, auth, storage, firestore, db };







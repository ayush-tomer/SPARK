import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB01g5j59-qx0UFH3FLtB48tikomB9SQtI",
  authDomain: "spark-1c644.firebaseapp.com",
  projectId: "spark-1c644",
  storageBucket: "spark-1c644.appspot.com",
  messagingSenderId: "228171804713",
  appId: "1:228171804713:web:8e4da059781a026a38ec38",
  measurementId: "G-QRMVHZSSEW"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };

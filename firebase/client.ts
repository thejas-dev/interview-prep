// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj0XRHCBF-HvH5S36_GVEcNgJkjMAOb1A",
  authDomain: "interview-prep-5c794.firebaseapp.com",
  projectId: "interview-prep-5c794",
  storageBucket: "interview-prep-5c794.firebasestorage.app",
  messagingSenderId: "917855616068",
  appId: "1:917855616068:web:fbae308b7d2c7d81c11011",
  measurementId: "G-0NZBEQKZLN"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app); 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdjRSee6jEo3D2BYy0T7GTDY-fjXLE-zk",
  authDomain: "jeepstop-cs145.firebaseapp.com",
  projectId: "jeepstop-cs145",
  storageBucket: "jeepstop-cs145.firebasestorage.app",
  messagingSenderId: "109208581352",
  appId: "1:109208581352:web:ea6345a5feb49a4a2bc55d",
  measurementId: "G-0CMWEZMGG0"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
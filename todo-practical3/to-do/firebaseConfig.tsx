import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCKs1RLOY8h6aLqbEEtWZlEBmAIplo2HnE",
    authDomain: "todo-55053.firebaseapp.com",
    projectId: "todo-55053",
    storageBucket: "todo-55053.firebasestorage.app",
    messagingSenderId: "493172562558",
    appId: "1:493172562558:web:bfd6fc72a541606156562f",
    measurementId: "G-GHYP9R5G38"
  };
  

// Initialize Firebase app only once
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };
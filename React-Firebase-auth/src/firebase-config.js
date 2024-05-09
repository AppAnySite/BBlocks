// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBAT_PTxnhsvGR9ZcYyDtECipfNjS3p1Q8",
    authDomain: "testingfirebase-b950e.firebaseapp.com",
    projectId: "testingfirebase-b950e",
    storageBucket: "testingfirebase-b950e.appspot.com",
    messagingSenderId: "722904298196",
    appId: "1:722904298196:web:b5f96e1e94833d163d0141",
    measurementId: "G-H7774WW1J5"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnZBMhdITjU4y-6ttDky64a9J-Et1TEAQ",
  authDomain: "social-auth-8430b.firebaseapp.com",
  projectId: "social-auth-8430b",
  storageBucket: "social-auth-8430b.appspot.com",
  messagingSenderId: "640586204574",
  appId: "1:640586204574:web:e2eaa8725439fade7d428f",
  measurementId: "G-F36M3QFRJX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

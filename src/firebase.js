// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1XZ4oH0wqTVNQLZLgPnocTtw5a9mPuU8",
  authDomain: "nova-prime-bf23d.firebaseapp.com",
  projectId: "nova-prime-bf23d",
  storageBucket: "nova-prime-bf23d.appspot.com",
  messagingSenderId: "766459785037",
  appId: "1:766459785037:web:4b37baebe870a7aadf9104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);

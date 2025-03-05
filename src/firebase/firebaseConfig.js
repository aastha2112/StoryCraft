// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_STORYCRAFT_API_KEY,
  authDomain: import.meta.env.VITE_STORYCRAFT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_STORYCRAFT_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORYCRAFT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_STORYCRAFT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_STORYCRAFT_APP_ID,
};

export const baseUrl = import.meta.env.VITE_STORYCRAFT_BASE_URL;

console.log({ firebaseConfig }, baseUrl, "base url");
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

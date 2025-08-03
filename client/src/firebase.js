// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-i68S6rMLmk2KOJcVtuJ9MxLZDaeqxDY",
    authDomain: "crownrealty.firebaseapp.com",
    projectId: "crownrealty",
    storageBucket: "crownrealty.firebasestorage.app",
    messagingSenderId: "726482419300",
    appId: "1:726482419300:web:02ae81f0d39fa051a46971",
    measurementId: "G-ZJDS9WV0VV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
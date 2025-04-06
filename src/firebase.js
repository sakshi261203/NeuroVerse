import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYEV_AY0BtP0Ud3j49RNAIUuyF-nvObJQ",
    authDomain: "fir-login-8ed9e.firebaseapp.com",
    projectId: "fir-login-8ed9e",
    storageBucket: "fir-login-8ed9e.firebasestorage.app",
    messagingSenderId: "236195077119",
    appId: "1:236195077119:web:d38600c5a668326c87e5ca",
    measurementId: "G-DK7GMYXTZN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
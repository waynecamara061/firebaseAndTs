import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAPTQ72w03vl4KWzHy5Vusm8_lTwigJeCo",
    authDomain: "wayne-dev-curso.firebaseapp.com",
    projectId: "wayne-dev-curso",
    storageBucket: "wayne-dev-curso.appspot.com",
    messagingSenderId: "785806913374",
    appId: "1:785806913374:web:9326eff32dc61d6c19e9cf",
    measurementId: "G-4Y6Z9LPHHB"
};

const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp);
const auth = getAuth(fireBaseApp)

export { db, auth };
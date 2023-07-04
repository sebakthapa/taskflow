// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDovSJksHjY6svC_tGjyG-sFLoStU9Xn5I",
    authDomain: "taskflow-c2890.firebaseapp.com",
    projectId: "taskflow-c2890",
    storageBucket: "taskflow-c2890.appspot.com",
    messagingSenderId: "385749572687",
    appId: "1:385749572687:web:41c0174039759ddbd59e3a",
    measurementId: "G-H0W01XECC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
const haha = async () => {
    const a = await isSupported();
    analytics = a ? getAnalytics(app) : null;
}
haha();



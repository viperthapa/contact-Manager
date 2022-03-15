import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDYXh7bY6UiT25XZ8di1ZCCJchNeIVJNuc",
    authDomain: "contact-imageupload.firebaseapp.com",
    projectId: "contact-imageupload",
    storageBucket: "contact-imageupload.appspot.com",
    messagingSenderId: "46184577141",
    appId: "1:46184577141:web:97375b9f00aab1fa87203c",
    measurementId: "G-MYGH7XR0W8"
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
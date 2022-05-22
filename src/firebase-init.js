// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env._REACT_APP_apiKey,
    authDomain: process.env._REACT_APP_authDomain,
    projectId: process.env._REACT_APP_projectId,
    storageBucket: process.env._REACT_APP_storageBucket,
    messagingSenderId: process.env._REACT_APP_messagingSenderId,
    appId: process.env._REACT_APP_appId
};
console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
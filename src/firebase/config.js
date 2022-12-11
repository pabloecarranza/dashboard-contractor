// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCc60W0okP8zgkkKcD5nAyWV2b1Uc-bA40',
	authDomain: 'trinity-renovations.firebaseapp.com',
	projectId: 'trinity-renovations',
	storageBucket: 'trinity-renovations.appspot.com',
	messagingSenderId: '275035689485',
	appId: '1:275035689485:web:0c2389a0075203d9823b44',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

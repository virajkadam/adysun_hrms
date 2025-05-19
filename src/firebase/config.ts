import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClAPu6h2UqoQjluZjT1cm8Z9GKI2N3yN8",
  authDomain: "employee-admin-c83e8.firebaseapp.com",
  projectId: "employee-admin-c83e8",
  storageBucket: "employee-admin-c83e8.appspot.com",
  messagingSenderId: "505257318838",
  appId: "1:505257318838:web:a2757c97da2c16b8020917",
  measurementId: "G-VNLCEDFYCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app; 
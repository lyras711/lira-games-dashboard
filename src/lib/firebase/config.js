
import { getAuth } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

console.log(process.env._FIREBASE_API_KEY);
// Load .env variables
const firebaseConfig = {
  apiKey: process.env._FIREBASE_API_KEY,
  authDomain: process.env._FIREBASE_AUTH_DOMAIN,
  projectId: process.env._FIREBASE_PROJECT_ID,
  storageBucket: process.env._FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env._FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env._FIREBASE_APP_ID,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);


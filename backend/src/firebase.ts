import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = JSON.parse(readFileSync('./firebase-config.json', 'utf-8'));

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

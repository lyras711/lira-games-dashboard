// 'use client';

import { collection, doc, setDoc, updateDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client.config';
import { getSession } from '@/actions/auth-actions';

export const addUser = async (user) => {
  
  try {
    console.log("addUser 10", user);
    // check if user exists
    const docRef = doc(db, 'Users', user.uid);
    const db_user = await getDoc(docRef);
    
    if (db_user.exists()) {
      console.log("user already exists");
      return;
    }
    
    await setDoc(docRef, {
      email: user.email,
      username: user.username || user.displayName || user.email,
      balance: 0,
      currentXP: 0,
      achievements: [],
      currentLevel: 0,
      tier: 0,
    }, { merge: true });

  } catch (error) {
    console.error(error);
  }
}

export const getUserData = async (uid) => {
  if (!uid) {
    return null;
  }
  const docRef = doc(db, 'Users', uid);
  try {
    const snapshot = await getDoc(docRef);
    let user = null;
    if (snapshot.exists()) {
      user = await snapshot.data();
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getCurrentUser = async () => {
  // read cookie
  const session = await getSession();
  const user = await getUserData(session);

  return user;
}

export const getUserByEmail = async (email) => {
  const q = query(collection(db, 'Users'), where('email', '==', email));
  try {
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    let user = null;
    await snapshot.forEach((document) => {
      user = {
        uid: document.id,
        ...document.data()
      }
      console.log('in snapshot', user);
    });
    console.log('user', user);
    return user.uid;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserBalance = async (uid, coins) => {
  
  try {
    const docRef = doc(db, 'Users', uid);
    const snapshot = await getDoc(docRef);
    let user = null;
    
    const user_data = await snapshot.data();

    if (!user_data) {
      return null;
    }

    user_data.balance += coins;

    await updateDoc(docRef, user_data);

    return user;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserSubscriptionPlan = async (uid, plan, tier) => {
  try {
    const docRef = doc(db, 'Users', uid);
    const snapshot = await getDoc(docRef);
    let user = null;
    
    const user_data = await snapshot.data();

    if (!user_data) {
      return null;
    }

    user_data.tier = tier;
    user_data.subscription = plan;

    await updateDoc(docRef, user_data);

    return user;
  } catch (error) {
    console.error(error);
  }
}
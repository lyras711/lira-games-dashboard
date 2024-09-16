
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { firebaseAuth } from '@/lib/firebase/client.config';
import { addUser } from '@/actions/users';

export function onAuthStateChanged(callback) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }

    const res = await addUser(result.user);

    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

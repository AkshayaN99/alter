import React from 'react';
import { auth, provider, signInWithPopup } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const GoogleAuth = () => {
  const [user] = useAuthState(auth);

  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <img src={user.photoURL} alt="Profile" />
          <button onClick={signOutUser}>Sign Out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;

import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      console.log("sing in");
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      console.log("sing in with google");
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      console.log("logout");
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <label>Auth</label>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <button onClick={() => signIn()}>sign In</button>
        <button onClick={() => signInWithGoogle()}>sign In with Google</button>
        <button onClick={() => logOut()}>log-out</button>
      </div>
    </div>
  );
};

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyASt4_aDu1E2NbnK_N2fDG8aObRBmpSJ7g",
  authDomain: "formulario-test-6ffce.firebaseapp.com",
  projectId: "formulario-test-6ffce",
  storageBucket: "formulario-test-6ffce.appspot.com",
  messagingSenderId: "278278153986",
  appId: "1:278278153986:web:2e05b5c2c7fa7ddbe8441b",
});

export const db = getFirestore(app);

export default app;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAsoUYZDiiG2cVFy70w1uRK2MAXTQs7Dwo",
  authDomain: "library-cfdf4.firebaseapp.com",
  projectId: "library-cfdf4",
  storageBucket: "library-cfdf4.appspot.com",
  messagingSenderId: "639120589182",
  appId: "1:639120589182:web:e0acb734008de24325732f"
};

export const firebaseApp = initializeApp(firebaseConfig);
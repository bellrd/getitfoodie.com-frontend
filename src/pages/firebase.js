import React from "react";
import ReactDom from "react-dom";
import fb from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJlmV9esBKOokrVd9gRETvxIv6cmynlK0",
  authDomain: "getit-website.firebaseapp.com",
  databaseURL: "https://getit-website.firebaseio.com",
  projectId: "getit-website",
  storageBucket: "getit-website.appspot.com",
  messagingSenderId: "151361898319",
  appId: "1:151361898319:web:b9a2f3c1975bc95898673a",
  measurementId: "G-GK6QXSEL58",
};

const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

export default firebase;

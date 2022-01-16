import React from "react";
import ReactDom from "react-dom";
import fb from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyDEGu4RYx2TvCK6AvyhR1Z83aLFh1QY4js",
  authDomain: "tomestry-b6f40.firebaseapp.com",
  projectId: "tomestry-b6f40",
  storageBucket: "tomestry-b6f40.appspot.com",
  messagingSenderId: "360056016218",
  appId: "1:360056016218:web:b6529ee0cec7d9713cb763",
  measurementId: "G-9NHLY95J1M",
};

const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

export default firebase;

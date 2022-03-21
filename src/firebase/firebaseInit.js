import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAexZE4W2xzKbkcoGkQrAhC6Locg1r8eAA",
    authDomain: "todo-app-19e2f.firebaseapp.com",
    projectId: "todo-app-19e2f",
    storageBucket: "todo-app-19e2f.appspot.com",
    messagingSenderId: "150904133213",
    appId: "1:150904133213:web:be8727de8834776cc11fb4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();
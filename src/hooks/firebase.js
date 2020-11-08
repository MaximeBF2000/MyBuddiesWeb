import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD4dqP2NyaaEmG2Et8NfmqxSKDmO1Kd0pM",
  authDomain: "potesapp-reactnative.firebaseapp.com",
  databaseURL: "https://potesapp-reactnative.firebaseio.com",
  projectId: "potesapp-reactnative",
  storageBucket: "potesapp-reactnative.appspot.com",
  messagingSenderId: "277331562406",
  appId: "1:277331562406:web:35e1adf83e676b047b8967"
}

firebase.initializeApp(firebaseConfig)

const fireStore = firebase.firestore()
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, fireStore, GoogleAuthProvider }
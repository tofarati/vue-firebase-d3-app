import firebase from 'firebase/app'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1wNaWJdHSkUnLFOR460pteP0pFj7RSPo",
  authDomain: "frontend-vuejs-assignment.firebaseapp.com",
  databaseURL: "https://frontend-vuejs-assignment-default-rtdb.firebaseio.com",
  projectId: "frontend-vuejs-assignment",
  storageBucket: "frontend-vuejs-assignment.appspot.com",
  messagingSenderId: "83397246428",
  appId: "1:83397246428:web:80286c972b21c1d91ca319",
  measurementId: "G-LEB0G1WKLT"
};

export default firebase.initializeApp(firebaseConfig)
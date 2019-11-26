import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyDSg_YTk5Wahzrajqbk328zv5TSmE4gbik',
    authDomain: 'friends-exchange.firebaseapp.com',
    databaseURL: 'https://friends-exchange.firebaseio.com',
    projectId: 'friends-exchange',
    storageBucket: 'friends-exchange.appspot.com',
    messagingSenderId: '1076500762546',
    appId: '1:1076500762546:web:a82b8185590c8c48e01eab'
  })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
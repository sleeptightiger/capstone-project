import firebase from 'firebase';
require('dotenv').config();

// Provided by the Firebase console
const config = {
  apiKey: 'AIzaSyDJLsxOaurSxuKNPR0dGc_UrIhoUUJc0sw',
  authDomain: 'wdi-capstone-12312.firebaseapp.com',
  databaseURL: 'https://wdi-capstone-12312.firebaseio.com',
  storageBucket: 'wdi-capstone-12312.appspot.com',
  messagingSenderId: '713926193149'
};

// Firebase instance
firebase.initializeApp(config);

// Firebase doesn't return data as an array but as a parent object
//  containing child objects. This utility function will extract
//  the child objects into an array and place the key as 'id'
const firebaseListToArray = (firebaseObjectList) => {
  if (!firebaseObjectList) return [];

  return Object.keys(firebaseObjectList)
    .map(k => {
      const obj = {
        id: k
      };
      for (let key in firebaseObjectList[k]) {
        if (firebaseObjectList[k].hasOwnProperty(key)) {
          obj[key] = firebaseObjectList[k][key];
        }
      }
      return obj;
    });
}

const database = firebase.database();
const auth = firebase.auth();

export { firebase, database, auth };
export { firebaseListToArray };

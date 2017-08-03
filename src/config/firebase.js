import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBB3c2Ld35nJN_mzZE0Lv3qmey-7CV_Azg",
    authDomain: "hkxsport-a8dd5.firebaseapp.com",
    databaseURL: "https://hkxsport-a8dd5.firebaseio.com",
    projectId: "hkxsport-a8dd5",
    storageBucket: "hkxsport-a8dd5.appspot.com",
    messagingSenderId: "416078860985"
  };
firebase.initializeApp(config);
export default firebase;

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

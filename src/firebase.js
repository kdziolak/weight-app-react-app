import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyAynRax8QxRYWkDNbNri9CvtjXPy48DMvY",
    authDomain: "weightapp-d7ea2.firebaseapp.com",
    databaseURL: "https://weightapp-d7ea2.firebaseio.com",
    projectId: "weightapp-d7ea2",
    storageBucket: "weightapp-d7ea2.appspot.com",
    messagingSenderId: "226514936980"
  };
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;
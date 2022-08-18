import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  authDomain: 'utak-exercise-e9850.firebaseapp.com',
  databaseURL: 'https://utak-exercise-e9850-default-rtdb.firebaseio.com',
  projectId: 'utak-exercise-e9850',
  storageBucket: 'utak-exercise-e9850.appspot.com',
}

const fireDb = firebase.initializeApp(firebaseConfig)
export default fireDb.database().ref()

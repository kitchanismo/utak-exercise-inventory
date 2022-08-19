import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  databaseURL: 'https://utak-exercise-e9850-default-rtdb.firebaseio.com',
}

const fireDb = firebase.initializeApp(firebaseConfig)
export default fireDb.database().ref()

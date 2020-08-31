import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBMKbhJHXwdV9_qB7q2JbbaRG7YisVQK_M",
  authDomain: "gen-art-ac98c.firebaseapp.com",
  databaseURL: "https://gen-art-ac98c.firebaseio.com",
  projectId: "gen-art-ac98c",
  storageBucket: "gen-art-ac98c.appspot.com",
  messagingSenderId: "1087151831393",
  appId: "1:1087151831393:web:acbd20c6b5e83e72be6d20"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const saveData = async data => {
  const docRef = await db.collection("items").add(data)
  console.log('doc saved', docRef.id)
  return docRef
}

const loadData = async () => {
  const querySnapshot = await db.collection("items").get()
  const items = []

  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() })
  })
  return items
}

export {
  saveData,
  loadData
}
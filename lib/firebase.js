import firebase from 'firebase/compat/app'; import 'firebase/compat/auth'; import 'firebase/compat/firestore'; import 'firebase/compat/storage'; 


const firebaseConfig = {
  apiKey: "AIzaSyDsFQKw4OPxxK_xfAXMqG2eqtFyT7C_2is",
  authDomain: "thoughtstreamm.firebaseapp.com",
  projectId: "thoughtstreamm",
  storageBucket: "thoughtstreamm.appspot.com",
  messagingSenderId: "452844795920",
  appId: "1:452844795920:web:bbad54cd26afb39218b295",
  measurementId: "G-L4WLGT879J"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyDSZIFNLdV37uknTatnv-hSYLjaJfbzfok",
  authDomain: "new-crwn-7ac65.firebaseapp.com",
  databaseURL: "https://new-crwn-7ac65.firebaseio.com",
  projectId: "new-crwn-7ac65",
  storageBucket: "new-crwn-7ac65.appspot.com",
  messagingSenderId: "625043296430",
  appId: "1:625043296430:web:67b5954d55e232b65bdd3f",
  measurementId: "G-10G48L15QR"
};


// Possible returns : querySnapshop or queryReference
// queryReference -> documentReference / collectionReference
// documentReference -> documentSnapShot  /  collectionReference -> querySnapShot
// CRUD operations can be performed on documentReference objects
// snapshot has property "exists" that tells if the document is real or whether it has any data
// NOTE: snapshot can't be used to manipulate data, it just represents the data, have to use the useRef which is the documentReference obj for such ops

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  // Add data into the retrieved uid of user
  if (!snapShot.exists){
    console.log("userAuth : ",userAuth)
    const {displayName, email} = userAuth
    const createdAt = new Date()
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log("error creating user : ",error.message)
    }
  }

  // After creation return the userRef
  return userRef
}


firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()


// Retrieve data from firestore and clean the data to get exact array as needed along with routeName
// encodeURI is javascript function used for formatting the url
// Note that .data() works on just documentReference object not snapshot
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, 
      items
    } 
  })

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}



// To send data over to firestore, it is required to send each data object one by one and not in an array. Hence, we want the transfer to fail
// if any 1 of them fails or succeed if all are transferred. For this, we batch the data using firestore.batch()
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(object => {
    // Allot a new document id to each object of our data (hats,sneaker,etc). Note that it is possible to do collectionRef.doc(object.id)
    // This would return each collection title
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, object)
  })

  // if successful, we would get a void value. This is useful if we need to chain the function using .then() for error handling 
  return await batch.commit()
}


// This function is just for returning the user after being signing in. Thre is no other promise based way of checking if user is signed or not
// Sagas use promised based way so we use the onAuthStateChanged observable and immedietly unsubscribe after getting the authenticated user
export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth =>{
      unsubscribeFromAuth()
      resolve(userAuth)
    }, reject)    
  })
}


//   Get auth object from firebase => choose authentication utility or OAuth => use popup for the signin of the OAuth 
//   Setting up google authentication utility. provider gives access to googleauthprovider
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt:'select_account'})

//    firebase has multiple authproviders such as for twitter, fb etc. auth.signInWithPopup(provider) tells to use a signinpopup for google    
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase


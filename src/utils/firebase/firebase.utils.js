import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq60vRrcguv9DwaB7a3H-5ixdZvIuuvfY",
    authDomain: "royal-clothing-db-64594.firebaseapp.com",
    projectId: "royal-clothing-db-64594",
    storageBucket: "royal-clothing-db-64594.appspot.com",
    messagingSenderId: "964850334726",
    appId: "1:964850334726:web:138f98a1aba9a5db1c1787"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Providers are the different companies such as facebook, github..etc
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({ prompt: 'select_account', })

export const auth = getAuth(firebaseApp)
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider) //authenticating the user throuigh popup
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider) //authenticating the user through redirect


// Points to the database inside the console in firebase
export const db = getFirestore()


// USed for adding user to the database collection
export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {
    if (!userAuth) {
        return;
    }
    try {

        console.log("User Auth: ", userAuth)
        const userDocRef = doc(db, 'users', userAuth.uid)
        // Doc takes in 3 arguments first is the db, second is the collection name and the third is the unique identifier

        // console.log(userDocRef)
        const userSnapshot = await getDoc(userDocRef)
        // console.log(userSnapshot)
        console.log(userSnapshot.exists())
        if (!userSnapshot.exists()) // snapshot allows to check if the user is present in the database and also allows us to make access to the data but not set it for setting we need to use docref
        {
            const displayName = userAuth.displayName
            const email = userAuth.email
            const createdAt = new Date()
            try {
                await setDoc(userDocRef, { displayName, email, createdAt,...additionalInformation })
                console.log("User Added")
            }
            catch (err) {
                console.log("Error setting the doc: ", err)
            }
        }
        else {
            console.log("User Exists No new addition")
        }
        return userDocRef;
    }
    catch (err) {
        console.log(err)
    }


}

// Used for only authenticating the user
export const createAuthUserDocumentWithEmailandPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    try{

        const authenticated_email_user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Successfully Authenticated")
        return authenticated_email_user;
    }
    catch(err)
    {
        if(err.code==='auth/email-already-in-use')
        {

            console.log("Error: ",err)
        }
        else{
            console.log("Authenticating Email/Password Error")
        }
    }

}


export const signInAuthUserDocumentWithEmailandPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    else{
        // console.log("INside firebase.utils")
        // console.log(auth,email,password)
        const response = await signInWithEmailAndPassword(auth,email,password)
        return response
    }
}
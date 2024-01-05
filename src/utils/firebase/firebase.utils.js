import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCa4xdkLI0kfdfybw3R2ZUyIvsrtjaAzsU',
    authDomain: 'in-style-db.firebaseapp.com',
    projectId: 'in-style-db',
    storageBucket: 'in-style-db.appspot.com',
    messagingSenderId: '70731315300',
    appId: '1:70731315300:web:fdae763a5b1c0fc5908771'
};
  
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const db = getFirestore();
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = write(db);

    objectsToAdd.array.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log("Done !")
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createDat = new Date();
        
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createDat,
                ...additionalInformation
            });
        }catch(err){
            console.log('Error Creating user: ', err.message)
        }
    }
    return userDocRef;
}

export const creatAuthUserWithEmailAndPassword = async (email, password) => {
    
    if(! email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    
    if(! email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
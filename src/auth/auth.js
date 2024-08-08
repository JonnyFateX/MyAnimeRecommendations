import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    
 } from "firebase/auth";

 import {
    getFirestore,
    setDoc,
    doc
 } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyATIPrcJimG0v5ABULU2jZkZ5dr1KPkmQM",
  authDomain: "myanimerecommendations-6ca48.firebaseapp.com",
  projectId: "myanimerecommendations-6ca48",
  storageBucket: "myanimerecommendations-6ca48.appspot.com",
  messagingSenderId: "134097553691",
  appId: "1:134097553691:web:eb2ec7fd8c7c25a021abbe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export class User{
    constructor(email, uid, displayName) {
        this.email = email
        this.uid = uid
        this.displayName = displayName
    }
}

export async function createUser(email, password, firstName, lastName){
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return new User(
                user.email,
                user.uid,
                user.displayName,
            )
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

        if(user){
            setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
            });
        }
    
        return user
}

export async function logInUser(email, password){
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export async function logOutUser(){
    const user = await auth.signOut()
    return user
}

export function currentUser(){
    const user = auth.currentUser
    if(user){
        return new User(
                user.email,
                user.uid,
                user.displayName,
            )
    }
    return null
    
}
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
 } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATIPrcJimG0v5ABULU2jZkZ5dr1KPkmQM",
  authDomain: "myanimerecommendations-6ca48.firebaseapp.com",
  projectId: "myanimerecommendations-6ca48",
  storageBucket: "myanimerecommendations-6ca48.appspot.com",
  messagingSenderId: "134097553691",
  appId: "1:134097553691:web:eb2ec7fd8c7c25a021abbe"
};

const app = initializeApp(firebaseConfig);

export class User{
    constructor(email, accessToken, displayName) {
        this.email = email
        this.accessToken = accessToken
        this.displayName = displayName
    }
}

export async function createUser(email, password){
    const auth = getAuth(app)
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            return new User(
                user.email,
                user.accessToken,
                user.displayName,
            )
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

export async function logInUser(email, password){
    const auth = getAuth(app)
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

const auth = getAuth(app)
export async function logOutUser(){
    const user = await auth.signOut()
    return user
}

export function currentUser(){
    const auth = getAuth(app)
    return auth.currentUser;
}
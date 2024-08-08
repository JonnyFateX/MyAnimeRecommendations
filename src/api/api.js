import { initializeApp } from "firebase/app";
import { currentUser } from "../auth/auth";
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc,
    updateDoc,
    arrayUnion,
    getCountFromServer,
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
const db = getFirestore(app)

const animesCollectionRef = collection(db, "animes")

export async function getAnimes(searchType, numberOfAnimes = 1){
    const excludeList = await getUserAnimes()
    //Get number of documents
    const documentCount = await getCountFromServer(animesCollectionRef)
        .then(snapshot => snapshot.data().count)
    //Create array from 0 to documentCount  [1, 2, 3, ..., documentCount]
    const documentIds = [...Array(documentCount).keys()].map(i => i+1)
    //Removes excluded elements from previous array
    const filteredDocumentIds = documentIds.filter((id) => !excludeList.includes(id.toString()))

    const animes = []
    for(let i = 0; i < numberOfAnimes; i++){
        const randomId = getRandomNumberInInterval(1, filteredDocumentIds.length)
        const anime = await getDoc(doc(db, "animes", filteredDocumentIds[randomId].toString()))
            .then(snapshot => {
                const data = snapshot.data()
                return {
                    ...data, 
                    rating: data.rating.toFixed(1),
                    firebaseId: snapshot.id
                }
            })
        animes.push(anime)
    }

    return animes
}

export async function addToWatchList(animeId){
    await updateDoc(getUserDocRef(), {
        watch_list: arrayUnion(animeId)
    })
}

export async function addToIgnoredList(animeId){ 
    await updateDoc(getUserDocRef(), {
        ignored_list: arrayUnion(animeId)
    })
}

async function getUserAnimes(){
    const snapshot = await getDoc(getUserDocRef())
    const userAnimes = [
        ...snapshot.data().watch_list, 
        ...snapshot.data().ignored_list
    ]
    return userAnimes
}

function getUserDocRef(){
    const user = currentUser()
    return doc(db, "users", user.uid);
}

function getRandomNumberInInterval(min, max) {
    const ms = new Date().getMilliseconds()/1000
    return Math.floor(Math.random() * ms * (max - min + 1) + min);
}
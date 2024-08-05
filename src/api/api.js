import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc,
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
    const documentCount = await getCountFromServer(animesCollectionRef)
    .then(snapshot => snapshot.data().count)

    const animes = []
    for(let i = 0; i < numberOfAnimes; i++){
        const randomId = getRandomNumberInInterval(1, documentCount)
        const anime = await getDoc(doc(db, "animes", randomId.toString()))
            .then(snapshot => {
                const data = snapshot.data()
                return {...data, rating: data.rating.toFixed(1)}
            })
        animes.push(anime)
    }

    return animes
}

function getRandomNumberInInterval(min, max) {
    const ms = new Date().getMilliseconds()/1000
    return Math.floor(Math.random() * ms * (max - min + 1) + min);
}

function getAnimeObject(anime){
    const title = anime.title_english? anime.title_english : anime.title
    const rating = anime.score
    const img = anime.images.jpg.large_image_url
    const genreList = anime.genres

    const malId = anime.mal_id
    const malURL = anime.url

    if(!title || !rating || !img || !genreList){
        return
    }

    const genres=genreList.map(genre => genre.name)

    return {
        title: title,
        genres: genres,
        img: img,
        rating: rating,
        malId: malId,
        malURL: malURL
    }
}
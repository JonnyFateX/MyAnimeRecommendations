import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATIPrcJimG0v5ABULU2jZkZ5dr1KPkmQM",
  authDomain: "myanimerecommendations-6ca48.firebaseapp.com",
  projectId: "myanimerecommendations-6ca48",
  storageBucket: "myanimerecommendations-6ca48.appspot.com",
  messagingSenderId: "134097553691",
  appId: "1:134097553691:web:eb2ec7fd8c7c25a021abbe"
};

const app = initializeApp(firebaseConfig);

export async function getAnimes(type){
    const url="https://api.jikan.moe/v4/anime"
    const parameters={
        type: type,
        min_score: 6.0,
        order_by: "mal_id",
        sort: "asc",
        sfw: "true",
        limit: 5,
    }

    let animes = []
    let pageTotal = 1
    
    for(let i=0; i < 3 ; i++){
        if(i !== 0){
            const queryParameters = 
                new URLSearchParams({
                    ...parameters, 
                    page: getRandomNumber(1, pageTotal)
                }
            )
            const response = await fetch(`${url}?${queryParameters}`)
            const responseJSON = await response.json()
            
            animes = [...animes, ...getAnimeObjects(responseJSON.data)]
        } else{
            const queryParameters = 
                new URLSearchParams({
                    ...parameters, 
                    page: getRandomNumber(1, 200)
                }
            )
            const response = await fetch(`${url}?${queryParameters}`)
            const responseJSON = await response.json()
            animes = [...animes, ...getAnimeObjects(responseJSON.data)]
            pageTotal = Number(responseJSON.pagination.last_visible_page)
        }

    }
    return animes
    
}

function getAnimeObjects(data){
    return data.map(anime => {
        const title = anime.title_english? anime.title_english : anime.title
        const rating = anime.score
        const img = anime.images.jpg.large_image_url
        const genreList=anime.genres

        if(!title || !rating || !img || !genreList){
            console.log(anime)
            return
        }

        const genres=genreList.map(genre => genre.name)

        return {
            title: title,
            genres: genres,
            img: img,
            rating: rating
        }
    })
}

function getRandomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
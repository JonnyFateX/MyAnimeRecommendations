import React from 'react'
import Header from "../../components/Header/Header"
import Card from "../../components/Card/Card"
import { 
    getAnimes, 
    addToWatchList, 
    addToIgnoredList 
} from '../../api/api.js'

export default function Home(){
    const [animes, setAnimes] = React.useState(null)
    const [searchType, setSearchType] = React.useState("tv")

    React.useEffect(()=>{
        if(searchType){
            getAnimes(searchType, 2)
            .then(animeObjects => {
            const animes = animeObjects.map(animeObject => {
                return {
                ...animeObject,
                img: (<img className="card--image" src={animeObject.img}/>)
                }
            }) 
            setAnimes(animes)
            })
        }
    }, [])

    async function provideNextAnime(action){
        //if statement prevents multiple requests
        if(animes.length > 1){
            //Adds anime to ignored/watch list
            const animeId = animes[0].firebaseId
            if(action === "watchlist"){
                await addToWatchList(animeId)
            }else{
                await addToIgnoredList(animeId)
            }
            
            //Get new anime
            getAnimes(searchType, 1)
                .then(animeObjects => setAnimes(prevAnimes => {
                    const animes = animeObjects.map(animeObject => {
                        return {
                        ...animeObject,
                        img: (<img className="card--image" src={animeObject.img}/>)
                        }
                    }) 
                    return [...prevAnimes, ...animes]
                }))

            //Provides next anime without waiting for fetch
            setAnimes(prevAnimes => [prevAnimes[1]])
        } 
    }

    return (
        <>
            <Header/>
            <main>
            {
                animes?
                <Card {...animes[0]} onClick={provideNextAnime}/>
                :
                null
            }
            </main>
        </>
    )
}
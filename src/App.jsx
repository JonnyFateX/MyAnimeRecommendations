import React from 'react'
import Header from './components/Header/Header.jsx'
import Card from './components/Card/Card.jsx'
import { getAnimes } from './api/api.js'

export default function App() {
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

  function provideNextAnime(action){
    //if statement makes prevents multiple requests
    if(animes.length > 1){
      getAnimes(searchType, 2)
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

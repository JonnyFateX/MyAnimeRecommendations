import React from 'react'
import Header from './components/Header/Header.jsx'
import Card from './components/Card/Card.jsx'
import Button from './components/Button/index.js'
import { getAnimes } from './api/api.js'

import { FaXmark } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";

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
          <Card
            {...animes[0]}
          >
            <Button position="bottom-left" onClick={() => provideNextAnime()}>
              <Button.Icon>
                <FaXmark size="28px" style={{color:"red"}}
                />
              </Button.Icon>
            </Button>
            <Button position="bottom-right" onClick={() => provideNextAnime()}>
              <Button.Icon>
                <ImCheckmark size="28px" style={{color:"green"}}/>
              </Button.Icon>
            </Button>
          </Card>
          :
          null
      }
      </main>
    </>
  )
}

import React from 'react'
import Header from './components/Header/Header.jsx'
import Card from './components/Card/Card.jsx'
import Button from './components/Button/index.js'
import { getAnimes } from './api/api.js'

import { FaXmark } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";

export default function App() {
  const [animes, setAnimes] = React.useState(null)
  const [animeIndex, setAnimeIndex] = React.useState(0)

  React.useEffect(()=>{
    getAnimes()
      .then(animeObjects => setAnimes([...animeObjects]))
  }, [])

  function provideNextAnime(action){
    //Add functionality according to action - pendent

    setAnimeIndex(prevIndex => {
      if(prevIndex === animes.length - 1){
        return 0
      } else{
        return (prevIndex+1)
      }
    })
  }

  return (
    <>
      <Header/>
      <main>
        {
        animes?
          <Card
            {...animes[animeIndex]}
          >
            <Button position="bottom-left" onClick={() => provideNextAnime()}>
              <Button.Icon color="red">
                <FaXmark/>
              </Button.Icon>
            </Button>
            <Button position="bottom-right" onClick={() => provideNextAnime()}>
              <Button.Icon color="green">
                <ImCheckmark/>
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

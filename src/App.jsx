import React from 'react'
import Header from '../src/components/Header.jsx'
import Card from '../src/components/Card.jsx'
import Button from '../src/components/Button/index.js'
import { getAnimes } from './api/api.js'

import { FaXmark } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";

export default function App() {
  const [animes, setAnimes] = React.useState(null)
  const [selectedAnime, setSelectedAnime] = React.useState([0])

  React.useEffect(()=>{
    getAnimes()
      .then(animeObjects => setAnimes([...animeObjects]))
  }, [])

  return (
    <>
      <Header/>
      <main>
        {
        animes?
          <Card
            {...animes[selectedAnime]}
          >
            <Button position="bottom-left">
              <Button.Icon color="red">
                <FaXmark />
              </Button.Icon>
            </Button>
            <Button position="bottom-right">
              <Button.Icon color="green">
                <ImCheckmark />
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

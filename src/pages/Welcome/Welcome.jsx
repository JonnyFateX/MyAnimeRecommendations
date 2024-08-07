import Background from '../../components/Background/Background'
import { Link } from 'react-router-dom'
import './Welcome.css'

export default function Welcome(){
    return (
      <>
        <Background/>
        <div className='home-container'>
          <div className='home--content'>
            <div className='home--title'>
              <h1>MAR</h1>
            </div>
            <p>
              Get anime recommendations from MyAnimeList. 
            </p>
            <Link className='get-started' to="/login">Get Started</Link>
          </div>
        </div>
      </>
      )
}
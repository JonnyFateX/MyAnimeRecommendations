import './Home.css'

export default function Home({onClick}){
    return (
        <div className='home-container'>
          <div className='home--title'>
            <h1>MAR</h1>
          </div>
          <p>
            Get anime recommendations from MyAnimeList. 
          </p>
          <button className='homeBtn' onClick={onClick}>Get Started</button>
          
        </div>
      )
}
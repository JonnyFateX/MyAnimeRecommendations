import React from "react"
import { logOutUser } from "../../auth/auth";
import "./Header.css"

import { PiUserCircleThin } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";

export default function Header(){
    const [visible, setVisibility] = React.useState(false)
    const [headerText, setHeaderText] = React.useState("MyAnimeRecommendations")

    function updateDisplay(width){
        if(width > 500){
            setHeaderText("MyAnimeRecommendations")
            if(!visible){
                setVisibility(true)
            }
        } else{
            setHeaderText("MAR")
            if(visible){
                setVisibility(false)
            } 
        }
    }

    React.useEffect(()=>{
        updateDisplay(window.innerWidth)
        window.addEventListener('resize', (e) =>{
            const width = e.target.innerWidth
            updateDisplay(width)
        });
        return window.removeEventListener('resize', () => {});
    }, [])

    function changeVisibility(){
        setVisibility(prevVisibility => !prevVisibility)
    }

    return (
        <header>
            <div className="title-container">
                <img className="web-icon" src="../assets/icons/cloud.svg" alt="cloud icon" />
                <span>{headerText}</span>
                <button onClick={changeVisibility} className="menu-button">
                    <IoIosMenu  className="navigation-icon"/>
                </button>
            </div>
            <nav style={{display: visible? "block" : "none"}}>
				<ul>
					<li><a className="header-link" href="">Watchlist</a></li>
					<li>
                        <a className="header-link" onClick={logOutUser} href="">
                            <PiUserCircleThin className="navigation-icon"/>
                        </a>
                    </li>
				</ul>
			</nav>
        </header>
    )
}
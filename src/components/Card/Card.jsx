import { FaStar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";

import "./Card.css"
import './Button.css'

export default function Card({img, title, rating, genres, onClick}){
    const genresArray = genres
    if(genresArray.length>3){
        genresArray.length = 3;
    }
   
    return (
        <div className="card">
            {img}

            <div className="card--info">
                <div className="card--text">
                    <h2>{title}</h2>
                    <h3>{genresArray.join(", ")}</h3>
                </div>
                <div className="rating-container">
                    <FaStar size="1.6rem" color="gold"/>
                    <p>{rating}</p>
                </div>
            </div>

            <button onClick={() => onClick()} className="btn bottom-left">
                <div>
                    <FaXmark size="28px" style={{color:"red"}}/>
                </div>
            </button>

            <button onClick={() => onClick()} className="btn bottom-right">
                <div>
                    <ImCheckmark size="28px" style={{color:"green"}}/>
                </div>
            </button>
            
        </div>
    )
}
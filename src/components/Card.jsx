import { FaStar } from "react-icons/fa";

export default function Card(props){
    const imgSrc = props.img
    const title = props.title
    const rating = props.rating
    const genres = props.genres.join(", ")
    
    return (
        <div className="card">
            <img className="card--image" src={imgSrc}/>
            <div className="card--info">
                <div className="card--text">
                    <h2>{title}</h2>
                    <h3>{genres}</h3>
                </div>
                <div className="rating-container">
                    <FaStar size="1.6rem" color="gold"/>
                    <p>{rating}</p>
                </div>
            </div>
            
            {props.children}
        </div>
    )
}
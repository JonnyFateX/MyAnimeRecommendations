import { FaXmark } from "react-icons/fa6";

export default function Button({onClick, position, children}){
    return (
        <button 
            onClick={onClick}
            className={`btn ${position}`}
        >
            {children}
        </button>
    )
}
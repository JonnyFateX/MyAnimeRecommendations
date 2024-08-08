import React from 'react'
import { Link } from "react-router-dom"
import "./Form.css"

export default function Form({
    fields, 
    onChange,
    paragraphText,
    linkContent, 
    linkTo,
    onSubmit,
    buttonContent,
    disabled,
    children
}){
    const fieldElements = fields.map((field, index) => {
        return (
            <React.Fragment key={"field" + index}>
                <label htmlFor={field.name}>{field.label}</label>
                <input 
                    type = {field.type} 
                    name = {field.name} 
                    onChange = {onChange}
                    placeholder = {field.placeholder}
                    />
            </React.Fragment>
        )
    })

    return (
        <div className='center-form'>
            <div className="form-card">
                {children}
                <form>
                    {fieldElements}
                </form>
                <p className="form-link-container">
                    {paragraphText}
                    <Link to={linkTo} className="form-link">{linkContent}</Link>
                </p>
            </div>       
            <button 
                className = "form-btn" 
                onClick = {onSubmit}
                disabled = {disabled}
                >{buttonContent}</button>
        </div>
    )
}
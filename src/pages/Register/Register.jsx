import React from "react"
import Background from "../../components/Background/Background"
import Form from "../../components/Form/Form.jsx"

import "./Register.css"

const formFields = [
    {
        name: "firstName",
        label: "First Name",
        placeholder: "Jonathan",
        type: "text"
    },
    {
        name: "lastName",
        label: "Last Name",
        placeholder: "Martinez",
        type: "text"
    },
    {
        name: "email",
        label: "Email Address",
        placeholder: "recommendations@mar.com",
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "************",
        type: "text"
    }
]

export default function Register({registerUser}){
    const [formData, setFormData] = React.useState({
        firstName: "", 
        lastName: "",
        email: "", 
        password: ""
    })
    const [active, setStatus] = React.useState(false)

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function onSubmit(){
        //...api
        registerUser("key")
    }

    return (
        <>
            <Background/>
            <div className="register-container">
                <Form
                    fields = {formFields}
                    onChange = {handleChange}
                    paragraphText = "Already have an account?"
                    linkContent = "Log in here."
                    onSubmit = {onSubmit}
                    buttonContent = "Create account"
                >
                    <h1>Create a new account</h1>
                </Form>
            </div>
        </>
    )
}
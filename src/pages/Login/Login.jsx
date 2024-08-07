import React from "react"
import Background from "../../components/Background/Background"
import Form from "../../components/Form/Form.jsx"
import "./Login.css"

const formFields = [
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
        type: "password"
    }
]

export default function Login(){
    const [formData, setFormData] = React.useState({email: "", password: ""})
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
    }

    return (
        <>
            <Background/>
            <div className="login-container">
                <Form
                    fields = {formFields}
                    onChange = {handleChange}
                    paragraphText = "Don't have an account?"
                    linkContent = "Create one here."
                    linkTo= "/register"
                    onSubmit = {onSubmit}
                    buttonContent = "Log in"
                >
                    <h1>Enter MAR</h1>
                </Form>
            </div>
        </>
    )
}
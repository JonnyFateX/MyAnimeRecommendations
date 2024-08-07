import React from "react"
import Background from "../../components/Background/Background"
import Form from "../../components/Form/Form.jsx"
import { createUser, currentUser, User } from "../../auth/auth.js"
import "./Register.css"
import { useNavigate } from "react-router-dom"

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
        type: "password"
    }
]

export default function Register(){
    const [formData, setFormData] = React.useState({
        firstName: "", 
        lastName: "",
        email: "", 
        password: ""
    })
    const [active, setStatus] = React.useState(false)
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function onSubmit(){
        let user = await createUser(formData.email, formData.password)
        if(user){
            navigate("/home")
        }
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
                    linkTo= "/login"
                    onSubmit = {onSubmit}
                    buttonContent = "Create account"
                >
                    <h1>Create a new account</h1>
                </Form>
            </div>
        </>
    )
}
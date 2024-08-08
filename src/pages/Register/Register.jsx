import React from "react"
import Background from "../../components/Background/Background"
import Form from "../../components/Form/Form.jsx"
import { createUser } from "../../auth/auth.js"
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
        type: "email"
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
    const [disabled, setDisabled] = React.useState(true)
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData(prevFormData => {
            let newFormData = {
                ...prevFormData,
                [event.target.name]: event.target.value
            }

            const keysArray = Object.keys(newFormData);
            let formNotEmpty = false
            keysArray.forEach(key => {
                if(newFormData[key] !== ""){
                    formNotEmpty = true
                }
            })
            let emailTruthy = emailValidator(newFormData.email)
            let passwordTruthy = passwordValidator(newFormData.password)

            //Activates button
            if(emailTruthy && passwordTruthy && formNotEmpty){
                setDisabled(false)
            } else{
                setDisabled(true)
            }

            return newFormData
        })   
    }

    function emailValidator(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function passwordValidator(password){
        const containsNumber = /\d/.test(password)
        const containsSpecial = /[!@#$%^&*(),.?":{}|<>+-]/.test(password);
        const longEnough = password.length > 8
        if(longEnough && containsNumber && containsSpecial){
            return true
        }
        return false
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
                    disabled = {disabled}
                >
                    <h1>Create a new account</h1>
                </Form>
            </div>
        </>
    )
}
import React from "react"
import Background from "../../components/Background/Background"
import "./Login.css"

export default function Login({logInUser}){
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
        logInUser("key")
    }

    return (
        <>
            <Background/>
            <div className="login-container">
                <div className="login-card">
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={handleChange}
                            placeholder="anime@mar.com"
                            />
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleChange}
                            placeholder="*************"
                        />
                    </form>
                </div>
                <button className="btnLogin" onClick={onSubmit}>Log in to MAR</button>
            </div>
        </>
    )
}
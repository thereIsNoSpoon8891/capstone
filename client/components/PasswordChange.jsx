import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const resetAxios = axios.create()



const PasswordChange = () => {

    const defaults ={
        password: "",
        verifyPassword: ""
    }

const [newPassword, setNewPassword] = useState(defaults)

const nav = useNavigate()
    // handle submitting a new password to the server, the link sent to the email, needs to route the 
    // user to THIS component, then we can use useParams hook to submit the passsword change.
    // will I be able to protect this route with the token present?
    // will I be able to send the token to the backend for auth?
    // I may need this route to login the user to keep it protected...
    const handleChange = e => {
        const {name, value} = e.target
            setNewPassword(prev => ({
                ...prev,
                [name]: value
            }))
    }

    const params = useParams()

// resetAxios.interceptors.request.use(config =>{
//     const token = params.token
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })

    const handleSubmit = e => {
        e.preventDefault();
            if(newPassword.password !== newPassword.verifyPassword){
                alert("Passwords Do NOT Match!")
            } else if (newPassword.password === newPassword.verifyPassword){
                let token = params.token
                let decodedToken = token.split('%2E').join('.')
                axios.patch(`/api/recovery/password-reset/${decodedToken}`, newPassword.password)
                    .then(res => {
                        console.log(res)
                        nav("/")
                    })
                    .catch(err => console.log(err))

            }
    }
    
    //console.log(newPassword)
    return(
        <div className="reset-background">
            <form className="reset-container">
                <h3>
                    Make a new Password
                </h3>
                <input
                name="password"
                placeholder="New Password"
                value={newPassword.password}
                type="password"
                onChange={handleChange}
                className="inputs"
                autoComplete="true"
                />

                <input
                name="verifyPassword"
                placeholder="Verify New Password"
                value={newPassword.verifyPassword}
                type="password"
                onChange={handleChange}
                className="inputs"
                autoComplete="true"
                />

                <button
                onClick={handleSubmit}
                className="auth--buttons"
                >
                    Submit
                </button>

            </form>
        </div>
    )
}

export default PasswordChange
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

    const handleChange = e => {
        const {name, value} = e.target
            setNewPassword(prev => ({
                ...prev,
                [name]: value
            }))
    }

    const params = useParams()


    const handleSubmit = e => {
        e.preventDefault();
            if(newPassword.password !== newPassword.verifyPassword){
                alert("Passwords Do NOT Match!")
            } else if (newPassword.password === newPassword.verifyPassword){
                let token = params.token
                let decodedToken = token.split('_').join('.')
                axios.patch(`/api/recovery/password-reset/${decodedToken}`, newPassword)
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
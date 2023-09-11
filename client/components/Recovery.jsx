import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Link } from "react-router-dom"
import axios from "axios"


const Recovery = () => {

    const [email, setEmail] = useState({
        email: "",
        message: ""
    })

    const [display, setDisplay] = useState(true)

    const handleReset = e => {
        e.preventDefault();
        
        if(!email.email) {
            setEmail(prevEmail => ({
                ...prevEmail,
                message: "Please enter a valid E-Mail address."
            }))
        } else if (email.email) {
            axios.post("/api/recovery/forgot-password", email)
                .then(res => {
                    console.log(res)
                    setDisplay(prev => !prev)
                })
                .catch(err => {
                    console.log(err)
                    setEmail(prev => ({
                        ...prev,
                        message: "something went wrong"
                    }))
                })
        }
        
    }
    
    const handleChange = e => {
        const {name, value} = e.target

            setEmail(prevEmail => ({
                ...prevEmail,
                    [name]: value
            }))
    }

//console.log(email.email)
// console.log(email.message)
    return(
    <div className="reset-background">
        {display ? <div
        className="reset-container"
        >
            <input
            className="inputs"
            type="email"
            placeholder="e-mail@mail.com"
            value={email.email}
            name="email"
            onChange={handleChange}
            />
            <button 
            onClick={handleReset}
            className="auth--buttons">
                Send Link
            </button>
            {email.message && <p>{email.message}</p>}
            <Link to="/">
            <p>
              or  click here to log in
            </p>
            </Link>
        </div>
        :
        <>
        <div className="reset-container">
            Request sent, please check your inbox and spam folder for password reset instructions.
            <Link to="/">
            <p>
              reset your password then, click here to log in.
            </p>
            </Link>
        </div>
        
        </>
        }
    </div>
    )
}

export default Recovery
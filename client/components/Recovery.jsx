import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Link } from "react-router-dom"


const Recovery = () => {

    const [email, setEmail] = useState({
        email: "",
        error: ""
    })

    const handleReset = e => {
        e.preventDefault();
        
        if(!email.email) {
            setEmail(prevEmail => ({
                ...prevEmail,
                error: "Please enter a valid E-Mail address."
            }))
        }
        // handle send email for reset
    }
    
    const handleChange = e => {
        const {name, value} = e.target

            setEmail(prevEmail => ({
                ...prevEmail,
                    [name]: value
            }))
    }

//console.log(email.email)
// console.log(email.error)
    return(
    <div className="reset-background">
        <div
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
                Reset Password
            </button>
            {email.error && <p>{email.error}</p>}
            <Link to="/">
            <p>
              or  click here to log in
            </p>
            </Link>
        </div>
    </div>
    )
}

export default Recovery
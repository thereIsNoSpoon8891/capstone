import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"




const ChangePassword = () => {
 
    const defineUser = {
        password: "",
        checkPassword: "",
        message: ""
    }
    const [inputs, setInputs] = useState(defineUser)

    const { changePassword, ...user } = useContext(UserContext)

    const handleSubmit = e => {
        e.preventDefault()
        if(inputs.password !== inputs.checkPassword){
            setInputs(prev => ({
                ...prev,
                message: "Passwords do NOT match"
            }))
        } else if(inputs.password === inputs.checkPassword){
                changePassword(inputs)
        }
    }

    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

return (
    <div className="reset-container">
        <form className="auth--container">
            
            <input
            minLength={5}
            type="password"
            onChange={handleChange}
            value={inputs.password}
            name="password"
            placeholder="Enter New Password"
            className="inputs"
            autoComplete="true"
            />

            <input 
            type="password"
            onChange={handleChange}
            value={inputs.checkPassword}
            name="checkPassword"
            placeholder="Verify New Password"
            className="inputs"
            autoComplete="true"
            />
        </form>
        <button
        onClick={handleSubmit}
        className="auth--buttons"
        >
            Submit
        </button>
    {inputs.message || user.errorMessage ? <p className="error-message">{inputs.errorMessage || user.errorMessage}</p> : ""}
        
    </div>
)
}
 
export default ChangePassword
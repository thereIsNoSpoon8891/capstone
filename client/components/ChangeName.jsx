import { useState, useContext } from "react"
import { UserContext } from "../context/userContext"



const ChangeName = () => {

    const defineUser = {
        username: "",
        checkName: "",
        message: ""
    }
    const [inputs, setInputs] = useState(defineUser)

    const { changeName, ...user } = useContext(UserContext)

    const handleChange = e => {
        const {name, value} = e.target
            setInputs(prevInputs => ({
                ...prevInputs,
                [name]: value
            }))
    }

    const handSubmit = e => {
        e.preventDefault();
        if(inputs.username !== inputs.checkName){
          return setNewUserName(prev => ({
                ...prev,
                message: "Usernames do NOT match"
            }))
        }

        changeName(inputs)
    }

   // console.log(newUserName)
return (
    <div className="reset-container">
        <form className="auth--container">
            
            <input
            minLength={5}
            type="text"
            onChange={handleChange}
            value={inputs.username}
            name="username"
            placeholder="Enter New User Name"
            className="inputs"/>

            <input 
            type="text"
            onChange={handleChange}
            value={inputs.checkName}
            name="checkName"
            placeholder="Verify New User Name"
            className="inputs"/>
        </form>
        <button
        onClick={handSubmit}
        className="auth--buttons"
        >
            Submit
        </button>
    {inputs.message || user.errorMessage ? <p className="error-message">{inputs.errorMessage || user.errorMessage}</p> : ""}
        
    </div>
)
}
 
export default ChangeName
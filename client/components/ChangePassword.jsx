import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import LoggedOutModal from "../components/LoggedOutModal"



const ChangePassword = () => {
 
    const defineUser = {
        password: "",
        checkPassword: "",
        message: ""
    }
    const [inputs, setInputs] = useState(defineUser)

    const [openModal, setOpenModal] = useState(false)

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
                handleModal()
        }
    }

    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleModal = () => {
        setOpenModal(prev => !prev)
    }

return (
    <div>
        <form className="reset-container">
            
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
        <button
        onClick={handleSubmit}
        className="auth--buttons"
        >
            Submit
        </button>
        </form>
    {inputs.message || user.errorMessage ? <p className="error-message">{inputs.errorMessage || user.errorMessage}</p> : ""}
        {openModal && <LoggedOutModal handleModal={handleModal}/>}
    </div>
)
}
 
export default ChangePassword
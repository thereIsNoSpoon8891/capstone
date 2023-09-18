import { useContext} from "react"
import { UserContext } from "../context/userContext"
import { log } from "react-modal/lib/helpers/ariaAppHider"



const LoggedOutModal = props => {
 
    const { handleModal } = props

    const { logout } = useContext(UserContext)

const multiHandle = () => {
    handleModal()
    logout()
}

return (
<div className="signed--out-modal">
    <p>
        Your Username or Password has been changed!
    </p>
    <p>
        YOU MUST SIGN OUT. 
    </p>
    <p>
        Please Sign Out and then, Sign in with your new credentials.
    </p>
    <button
    onClick={multiHandle}
    >
        Contine to Sign In
    </button>
</div>
)
}
 
export default LoggedOutModal
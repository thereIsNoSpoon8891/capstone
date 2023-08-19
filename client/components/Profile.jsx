import { useContext } from "react"
import { UserContext } from "../context/userContext"
import UserLocW from './UserLocW'




const Profile = () => {

    const {user, token} = useContext(UserContext) 

//console.log(user)
//console.log(token)
    return(
        <div className="profile--container">

            <h2>
                Use Your Location to get local weather.
            </h2>
            <UserLocW />

        </div>
    )
}

export default Profile
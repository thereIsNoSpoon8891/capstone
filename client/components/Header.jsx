import { useContext } from "react"
import { UserContext } from "../context/userContext"
import Nav from "./Nav"


const Header = () => {


const {user} = useContext(UserContext)

    return(
        <div className="header--container">
            <h1 className="header--welcome">
              Weather or Not 
            </h1>
            <span className="name-container">How's the Weather <span className="name">{user.username}?</span></span>
            <Nav />
        </div>
    )
}

export default Header
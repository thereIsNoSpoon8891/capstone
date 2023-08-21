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
            <h3>Logged in as {user.username}</h3>
            <Nav />
        </div>
    )
}

export default Header
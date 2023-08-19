import { useContext } from "react"
import { UserContext } from "../context/userContext"
import Nav from "./Nav"


const Header = () => {


const {user} = useContext(UserContext)

    return(
        <div>
            <h1 className="header--welcome">
            {user?.username}, Welcome to Weather or not. 
            </h1>
            <Nav />
        </div>
    )
}

export default Header
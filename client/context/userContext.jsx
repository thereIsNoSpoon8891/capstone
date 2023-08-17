import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext()

const UserContextProvider = props => {
    const {children} = props
    
    const [user, setUser] = useState({
        user: {},
        token: ""
    })

    

    return(
        <UserContext.Provider
        value={{
            user
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
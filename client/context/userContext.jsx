import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext()

const UserContextProvider = () => {
    
    
    return(
        <UserContext.Provider>

        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
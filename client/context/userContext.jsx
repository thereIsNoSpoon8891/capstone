import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext()

const UserContextProvider = props => {
    const {children} = props
    
    const [user, setUser] = useState({
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errorMessage: ""
    })

    const signUp = credentials => {
        axios.post(`/api/auth/signup`, credentials)
            .then(res => {
                const {user, token} = res.data
                    localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("token", token)//set user
                            setUser(prevUser => ({
                                ...prevUser,
                                user,
                                token
                            }))
            })
            .catch(err => handleError(err.response.data.errorMessage))
    }

    const login = credentials => {
        axios.post(`/api/auth/login`, credentials)
            .then(res => {
                const {user, token} = res.data
                    localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("token", token)
                            setUser(prevUser => ({
                                ...prevUser,
                                user,
                                token
                            }))
            })
            .catch(err => handleError(err.response.data.errorMessage))
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({
            user: {},
            token: ""
        })
    }

    const handleError = err => {
        setUser(prevUser => ({
            ...prevUser,
            errorMessage: err
        }))
    }

    const resetError = () => {
        setUser(prevUser => ({
            ...prevUser,
            errorMessage: ""
        }))
    }

    return(
        <UserContext.Provider
        value={{
            ...user,
            signUp,
            login,
            logout,
            resetError
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
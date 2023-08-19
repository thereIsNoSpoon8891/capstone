import { createContext, createFactory } from "react";
import axios from 'axios'

const iAxios = axios.create()

iAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const LocationsContext = createContext()


const LocationsContextProvider = props => {

    const {children} = props

    

    return(
        <LocationsContext.Provider
        value={{

        }}
        >
            {children}
        </LocationsContext.Provider>
    )
}
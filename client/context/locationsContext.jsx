import { createContext, useState } from "react";
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

    const [userLoc, setUserLoc] = useState([])

    
    const postLocation = location => {
        iAxios.post("/api/auth/locations", location)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const getUserLocs = () => {
        iAxios.get("/api/auth/locations")
            .then(res => setUserLoc(res.data))
            .catch(err => console.log(err))
    }

    const deleteLoc = id => {
        iAxios.delete(`/api/auth/locations/${id}`)
            .then(res => {
                console.log(res)
                getUserLocs()
            })
            .catch(err => console.log(err))
    }

    return(
        <LocationsContext.Provider
        value={{
            postLocation,
            getUserLocs,
            deleteLoc,
            userLoc
        }}
        >
            {children}
        </LocationsContext.Provider>
    )
}

export {LocationsContextProvider, LocationsContext}
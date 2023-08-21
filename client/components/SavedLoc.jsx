import { useEffect, useContext } from "react"
import WeatherCard from "./WeatherCard"
import { LocationsContext } from "../context/locationsContext"


const SavedLoc = () => {

    const {getUserLocs, userLoc} = useContext(LocationsContext)

    useEffect(() => {
        getUserLocs()
    }, [])

const locationElements = userLoc.map(loc => (<WeatherCard
                                                key={loc._id}
                                                location={loc.location}
                                                id={loc._id}
                                                />))
//console.log(userLoc)

    return(
        <>
            {locationElements}
            
        </>
    )
}

export default SavedLoc
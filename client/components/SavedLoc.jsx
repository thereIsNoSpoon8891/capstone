import { useEffect, useContext, useState } from "react"
import WeatherCard from "./WeatherCard"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import { LocationsContext } from "../context/locationsContext"


const SavedLoc = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const {getUserLocs, userLoc} = useContext(LocationsContext)

    const handleModal = () => {
        setModalOpen(prev => !prev)
    }

    useEffect(() => {
        getUserLocs()
    }, [])

const locationElements = userLoc.map(loc => (<WeatherCard
                                                key={loc._id}
                                                location={loc.location}
                                                id={loc._id}
                                                handleModal={handleModal}
                                                />))
//console.log(userLoc)

    return(
        <>
            {locationElements}
            
            {modalOpen && <ConfirmDeleteModal 
            handleModal={handleModal}
            />}
        </>
    )
}

export default SavedLoc
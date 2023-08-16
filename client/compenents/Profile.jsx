import { useState, useEffect } from "react"
import axios from 'axios'





const Profile = () => {

    const [zipcode, setZipcode] = useState("")

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                    axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.49ccc9d5109cc47016439e63aab6e285&lat=${lat}&lon=${lon}&format=json`)
                        .then(response => {
                            if (response.data.address && response.data.address.postcode) {
                                setZipcode(response.data.address.postcode)
                            }
                        })
                        .catch(err => console.log(`Error: ${err}`))
            })
        }
    }, [])
    

    return(
        <div>
            {zipcode ? `Zipcode is ${zipcode}` : `locating`}
        </div>
    )
}

export default Profile
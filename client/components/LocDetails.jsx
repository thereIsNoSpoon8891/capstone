import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Day from "./Day"


const LocDetails = () => {

    const [forecast, setForecast] = useState([])

    const param = useParams()

    useEffect(() => {
    const W_API_KEY = import.meta.env.VITE_WEATHER_KEY
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${W_API_KEY}&q=${param.location}&days=5`)
            .then(res => setForecast(res.data.forecast.forecastday))
            .catch(err => console.log(`Error: ${err}`))

    }, [param.location])

    const dayElements = forecast.map(day =>( 
        <Day 
        key={day.date_epoch}
        astro={day.astro}
        date={day.date}
        daily={day.day}
        />))
    return(
        <>
        {dayElements}
        </>
    )
}

export default LocDetails
import { useState, useEffect, useContext } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import { LocationsContext } from "../context/locationsContext"




const WeatherCard = props => {

    const {location, id} = props

    const [currentWeather, setCurentWeather] = useState("")

    const {deleteLoc} = useContext(LocationsContext)

    useEffect(() => {

    const W_API_KEY = import.meta.env.VITE_WEATHER_KEY

        if (location) {
            axios.get(`http://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${location}`)
                .then(res => setCurentWeather(res.data.current))
                .catch(err => console.log(`Error: ${err}`))
        }

    }, [])

    const handleDelete = () => {
        deleteLoc(id)
    }

    return(
        <>
            {location &&
                <div className="current--container">
                <h3>{location}</h3>
                <p>Condition: {currentWeather.condition?.text}</p>
                <p>Temperature: {currentWeather.temp_f}</p>
                <p>Feels Like: {currentWeather.feelslike_f}</p>
                <p>UV Index: {currentWeather.uv}</p>
                <p>Wind Speed:{currentWeather.wind_mph}</p>
                <p>Wind Direction: {currentWeather.wind_dir}</p>
                <p>Cloud Coverage: %{currentWeather.cloud}</p>
                <img width={150} src={currentWeather.condition?.icon}/>
                <Link
                to={`/forecast/${location}`}
                >
                    <button>Forecast</button>
                </Link>

                <button
                onClick={handleDelete}
                >
                    Delete
                </button>
            </div>}
        </>
    )
}

export default WeatherCard
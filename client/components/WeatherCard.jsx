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
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${location}`)
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
                <p className="condition"> {currentWeather.condition?.text}</p>
                <p className="temp">Temperature: {currentWeather.temp_f}&deg;F</p>
                <p className="feel-temp">Feels Like: {currentWeather.feelslike_f}&deg;F</p>
                <p className="uv">UV Index: {currentWeather.uv}</p>
                <p className="wind-speed">Wind Speed:{currentWeather.wind_mph}</p>
                <p className="wind-dir">Wind Direction: {currentWeather.wind_dir}</p>
                <p className="cloud">Cloud Coverage: %{currentWeather.cloud}</p>
                <img className="icon" width={150} src={currentWeather.condition?.icon}/>
                <Link
                to={`/forecast/${location}`}
                >
                    <button className="forecast-button">Forecast</button>
                </Link>

                <button
                className="delete-button"
                onClick={handleDelete}
                >
                    Delete
                </button>
            </div>}
        </>
    )
}

export default WeatherCard
import {useState, useContext} from 'react'
import { LocationsContext } from '../context/locationsContext'
import Day from './Day'
import axios from 'axios'



const Search = () => {

    const defaultLoc = {
        location: ""
    }
    

    const [location, setLocation] = useState(defaultLoc)

    const [weather, setWeather] = useState("")

    const [forecast, setForecast] = useState([])

    const [error, setError] = useState("")

    const {postLocation} = useContext(LocationsContext)

    const handleChange = e => {
        const {name, value} = e.target
        setLocation(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = e => {// this needs to be a 'save' button
        e.preventDefault()
            postLocation(location)
    }

    const findWeather = e => {

        e.preventDefault()

    const W_API_KEY = import.meta.env.VITE_WEATHER_KEY

        axios.get(`http://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${location.location}`)
            .then(res => setWeather(res.data.current))
            .catch(err => setError(`Error: ${err}`))

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${W_API_KEY}&q=${location.location}&days=5`)
            .then(res => setForecast(res.data.forecast.forecastday))
            .catch(err => setError(`Error: ${err}`))

        if(error) {
            setError("")
            setWeather("")
            setForecast([])
        }
    }
    const dayElements = forecast.map(day =>( 
        <Day 
        key={day.date_epoch}
        astro={day.astro}
        date={day.date}
        daily={day.day}
        />))
//console.log(location)
//console.log(weather)
    return(
        <div>
            <form className='search-form'>
                <input
                type='text'
                name='location'
                value={location.location}
                onChange={handleChange}
                placeholder='Phoenix, AZ'
                className='search--location-input'
                />
                <button
                className='find-button'
                onClick={findWeather}
                >
                    Find Weather
                </button>
            </form>
            {weather && 
            <div className="current--container">
                <p className='location'>{location.location}</p>
                <p className="condition">{weather.condition?.text}</p>
                <p className="temp"> Temperature: {weather.temp_f}</p>
                <p className="feel-temp">Feels Like: {weather.feelslike_f}</p>
                <p className="uv">UV Index: {weather.uv}</p>
                <p className="wind-speed">Wind Speed:{weather.wind_mph}</p>
                <p className="wind-dir">Wind Direction: {weather.wind_dir}</p>
                <p className="cloud">Cloud Coverage: %{weather.cloud}</p>
                <img className="icon" width={150} src={weather.condition?.icon}/>
                <button
                className='save-button'
                 onClick={handleSubmit} >
                    Save To 'My Locations'
                </button>
            </div>
            }
            {weather && dayElements}
            {error &&
            <>
            <p>This is not the weather your looking for....</p>
            <p>Please use City, State format OR Postal Code </p>
            </>
            }
        </div>
    )
}

export default Search
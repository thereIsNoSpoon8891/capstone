import { useState, useEffect } from "react"
import axios from 'axios'
import Day from "./Day"


const Profile = () => {

    const [location, setLocation] = useState("")
    const [toggleState, setToggleState] = useState(false)
    const [currentWeather, setCurentWeather] = useState("")
    const [forecast, setForecast] = useState([])

const getUserLocation = () => {
    setToggleState(prev => !prev)
    const G_KEY = import.meta.env.VITE_GEO_KEY
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                //console.log(position) get users LAT and LONG
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                    axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${G_KEY}&lat=${lat}&lon=${lon}&format=json`)
                        .then(response => {
                            //console.log(response.data) location object
                            if (response.data.address && response.data.address.postcode) {
                                setLocation(response.data.address)
                            } else {
                                alert('Cannot get location, please enable location sharing on your device.')
                            }
                        })
                        .catch(err => console.log(`Error: ${err}`))
        })
    }
}

useEffect(() => {
    const W_API_KEY = import.meta.env.VITE_WEATHER_KEY
    if(location){
        // current weather by location
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${location.postcode}`)
        .then(res => setCurentWeather(res.data.current))
        .catch(err => console.log(`Error: ${err}`))
        // 5 day forecast by location
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${W_API_KEY}&q=${location.postcode}&days=5`)
        .then(res => setForecast(res.data.forecast.forecastday))
        .catch(err => console.log(`Error: ${err}`))
    }
},[location])
    
const dayElements = forecast.map(day =>( 
    <Day 
    key={day.date_epoch}
    astro={day.astro}
    date={day.date}
    daily={day.day}
    />))
//console.log(currentWeather)
//console.log(forecast)
    return(
        <div>
            <div>

                {
                    toggleState && 
                 <div>
                     {location ? <p>{location.city}, {location.state}, {location.postcode}</p> : <p>Locating...</p>} 
                 </div> 
                }

                <button onClick={getUserLocation}>
                    Use my location.
                </button>
            </div>

            {location &&
            <div>
                <p>Condition: {currentWeather.condition?.text}</p>
                <p>Temperature: {currentWeather.temp_f}</p>
                <p>Feels Like: {currentWeather.feelslike_f}</p>
                <p>UV Index: {currentWeather.uv}</p>
                <p>Wind Speed:{currentWeather.wind_mph}</p>
                <p>Wind Direction: {currentWeather.wind_dir}</p>
                <p>Cloud Coverage: %{currentWeather.cloud}</p>
                <img width={150} src={currentWeather.condition?.icon}/>
            </div>}
                {dayElements}
        </div>
    )
}

export default Profile
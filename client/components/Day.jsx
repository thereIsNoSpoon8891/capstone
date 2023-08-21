




const Day = props => {

const {astro, date, daily} = props
//console.log(astro)
//console.log(date)
//console.log(daily)
    return(
        <div className="day--container">
            <p className='location'>{date}</p>
            <p className="condition">{daily.condition?.text}</p>
            <p className="temp">Sunrise: {astro?.sunrise}</p>
            <p className="feel-temp">Sunset: {astro?.sunset}</p>
            <p className="uv">High of: {daily?.maxtemp_f}&deg;F</p>
            <p className="wind-speed">Low of: {daily?.mintemp_f}&deg;F</p>
            <p className="wind-dir">Winds up to {daily?.maxwind_mph}MPH</p>
            <p className="cloud">Possible rain of {daily?.totalprecip_in} inches</p>
            <img className="icon" width={100} src={daily.condition?.icon} />
        </div>
    )
}

export default Day
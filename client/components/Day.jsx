




const Day = props => {

const {astro, date, daily} = props
//console.log(astro)
//console.log(date)
//console.log(daily)
    return(
        <div className="day--container">
            <p>Date:{date}</p>
            <p>Condition: {daily.condition?.text}</p>
            <p>Sunrise: {astro?.sunrise}</p>
            <p>Sunset: {astro?.sunset}</p>
            <p>High of: {daily?.maxtemp_f}&deg;F</p>
            <p>Low of: {daily?.mintemp_f}&deg;F</p>
            <p>Winds up to {daily?.maxwind_mph}MPH</p>
            <p>Possible rain of {daily?.totalprecip_in} inches</p>
            <img width={100} src={daily.condition?.icon} />
        </div>
    )
}

export default Day
import { useState, useEffect, useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext"
import axios from 'axios'




const Auth = () => {

    const defaultInputs = {
        username: "",
        password: "",
        verifyPassword: "",
        email: "",
        errorMessage: ""
    }
    // add email for recovery

    const [toggleForm, setToggleForm] = useState(false)

    const [inputs, setInputs] = useState(defaultInputs)

    const [randomCity, setRandomCity] = useState("")

    const timer = useRef()

    const {signUp, login, resetError, token, ...user} = useContext(UserContext)

    const handleChange = e => {
        const {name, value} = e.target
            setInputs(prevInputs => ({
                ...prevInputs,
                [name]: value
            }))
    }

    const handleSignUp = e => {
        e.preventDefault()
            if(!inputs.username || !inputs.password || !inputs.email) {
                setInputs(prevInputs => ({
                    ...prevInputs,
                    errorMessage: "Please fill out all required fields"
                }))
            }
            if (inputs.password !== inputs.verifyPassword){
                    setInputs(prevInputs => ({
                        ...prevInputs,
                        errorMessage: "Passwords do NOT match"
                    }))
            } else if (inputs.password === inputs.verifyPassword) {
                signUp(inputs)
                    setInputs(defaultInputs)
            }
    }

    const handleLogin = e => {
        e.preventDefault()
            login(inputs)
                setInputs(defaultInputs)
    }

    const toggleForms = () => {
        setToggleForm(prevForm => !prevForm)
        setError()
    }

    const setError = () => {
        setInputs(prevInputs => ({
            ...prevInputs,
            errorMessage: ""
        }))
        resetError()
    }
    
    const randomWeather = () => {
        const W_API_KEY = import.meta.env.VITE_WEATHER_KEY
            const cities = ['paris', 'new york', 'phoenix', 'dallas', 'seattle', 'miami',
             'cleveland', 'long beach', 'salt lake city', 'anchorage', 'honolulu']
            let city = cities[Math.floor(Math.random() * cities.length)]
                axios.get(`https://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${city}`)
                    .then(res => setRandomCity(res.data))
                    .catch(err => console.log(err))
    }

    const cleanUp = () => {
        clearInterval(timer.current)
    }

    useEffect(() => {

        timer.current = setInterval(randomWeather, 5000);

        return cleanUp

    }, [])
  
   return (
<div className="landing-page--container">
   <div className="login-page--container">
        {toggleForm ?
        <form 
        className="auth--container">
            <h1>Sign Up</h1>
            <input
            className="inputs"
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="User Name"
            minLength={5}
            />

            <input 
            className="inputs"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="true"
            minLength={5}
            />
            <input
            className="inputs"
            type="password"
            name="verifyPassword"
            value={inputs.verifyPassword}
            onChange={handleChange}
            placeholder="Verify Password"
            minLength={5}
            autoComplete="true"
            />
            <input
            className="inputs"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="myemail@gmail.com"
            />
            
            <button
            className="auth--buttons"
            onClick={handleSignUp}
            >
                Sign Up
            </button>

        </form>
    :
    <form
    className="auth--container"
    >
            <h1>Login</h1>
            <input
            className="inputs"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="User Name"
            />

            <input 
            className="inputs"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="true"
            />

            <button 
            className="auth--buttons"
            onClick={handleLogin}
            >
                Sign In
            </button>
        </form>    
    }
    {toggleForm ?
    <p>Have an account? Click <u className="toggle-link" onClick={toggleForms}>Here</u> to Log in.</p>
    :
    <p>Need an account? Click <u className="toggle-link" onClick={toggleForms}>Here</u> to make one.</p>
}
    {inputs.errorMessage || user.errorMessage ? <p className="error-message">{inputs.errorMessage || user.errorMessage}</p> : ""}
    
    <p>
        Forgot password? Click <Link to="/recovery"> <u>Here</u></Link> to reset it.
    </p>

    </div>
    {randomCity ? <div className="rando-city-container">
        <h1>
            {randomCity.location?.name}, {randomCity.location?.region}
        </h1>
        <img width={100} src={randomCity.current?.condition?.icon} />
        <h3>
            {randomCity.current?.condition?.text}
        </h3>
        <p>
            Currently {randomCity.current?.temp_f}&deg;F
        </p>
        <p>
           Feels like... {randomCity.current?.feelslike_f}&deg;F
        </p>
    </div>
    :
    <div className="rando-city-container">
        <p>
        Loading some weather...
        </p>
    </div>
    }
</div>

    )
}

export default Auth
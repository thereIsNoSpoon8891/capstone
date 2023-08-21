import { useState, useEffect,useContext } from "react"
import { UserContext } from "../context/userContext"
import axios from 'axios'




const Auth = () => {

    const defaultInputs = {
        username: "",
        password: "",
        verifyPassword: "",
        errorMessage: ""
    }

    const [toggleForm, setToggleForm] = useState(false)

    const [inputs, setInputs] = useState(defaultInputs)

    const [randomCity, setRandomCity] = useState("")

    const {signUp, login, resetError, ...user} = useContext(UserContext)

    const handleChange = e => {
        const {name, value} = e.target
            setInputs(prevInputs => ({
                ...prevInputs,
                [name]: value
            }))
    }

    const handleSignUp = e => {
        e.preventDefault()
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
            const cities = ['paris', 'new york', 'phoenix', 'dallas', 'seattle']
            let city = cities[Math.floor(Math.random() * cities.length)]
                axios.get(`http://api.weatherapi.com/v1/current.json?key=${W_API_KEY}&q=${city}`)
                    .then(res => setRandomCity(res.data))
                    .catch(err => console.log(err))
    }

    useEffect(() => {
        randomWeather()
    }, [])
    //console.log(inputs)
    //console.log(user.errorMessage)
    console.log(randomCity)
   return (
    <>
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
            />

            <input 
            className="inputs"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            />
            <input
            className="inputs"
            type="password"
            name="verifyPassword"
            value={inputs.verifyPassword}
            onChange={handleChange}
            placeholder="Verify Password"
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
    <p>Already a member? Click <u onClick={toggleForms}>here</u> to Log in.</p>
    :
    <p>Not a memeber? Click <u onClick={toggleForms}>here</u> to Create a Account.</p>
}
    {inputs.errorMessage || user.errorMessage ? <p>{inputs.errorMessage || user.errorMessage}</p> : ""}
    </div>
    <div className="rando-city-container">
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
</>

    )
}

export default Auth
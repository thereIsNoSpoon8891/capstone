import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'





const ProtectedRoutes = props => {

const {token, children} = props

const nav = useNavigate()

useEffect(() => {

    if(!token) {
        nav("/")
    }
}, [token])

    return token ? children : null
}

export default ProtectedRoutes
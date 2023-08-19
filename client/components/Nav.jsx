import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'


const Nav = () => {

const { logout, token } = useContext(UserContext) 

    return(
        <>

            <div className="nav--container">
                <Link to='/profile'>
                    <h1>
                        My Weather
                    </h1>
                </Link>
                <Link to='/search' >
                    <h1>
                        My Locations
                    </h1>
                </Link>

                    <button onClick={logout} >
                        Log Out
                    </button>
            </div>
        </>
    )
}

export default Nav
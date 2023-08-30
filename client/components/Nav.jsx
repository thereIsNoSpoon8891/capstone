import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'


const Nav = () => {

const { logout, token } = useContext(UserContext) 

    return(
        <>

            <div className="nav--container" id='nav'>
                <Link to='/profile'>
                    <h1>
                        Local Weather
                    </h1>
                </Link>
                <Link to='/search' >
                    <h1>
                        Search
                    </h1>
                </Link>
                <Link to="/saved" >
                    <h1>
                        My locations
                    </h1>
                </Link>

                    <button className='log-out-button' onClick={logout} >
                        LOG OUT
                    </button>
            </div>
        </>
    )
}

export default Nav
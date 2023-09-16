import { Link } from 'react-router-dom'





const Settings = () => {
    return(
        <div className="settings--container">
        <ul className="settings--ul">
            <li>
                Change Theme 
            </li>
            <Link to='/changename'>
                <li>
                    Change User Name
                </li>
            </Link>
            <Link to="/changepassword">
                <li>
                    Change Password
                </li>
            </Link>
        </ul>
        </div>
    )
}

export default Settings
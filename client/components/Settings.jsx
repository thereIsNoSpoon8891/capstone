import { Link } from 'react-router-dom'





const Settings = () => {

    const handleTheme = () => {
        alert("Theme feature coming Soon!")
    }
    return(
        <div className="settings--container">
        <ul className="settings--ul">
            <li onClick={handleTheme}>
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
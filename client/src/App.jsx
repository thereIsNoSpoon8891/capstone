import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import Profile from '../components/Profile'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Search from '../components/Search'
import SavedLoc from '../components/SavedLoc'
import Settings from '../components/Settings'
import Recovery from '../components/Recovery'
import ChangeName from '../components/ChangeName'
import LocDetails from '../components/LocDetails'
import ChangePassword from '../components/ChangePassword'
import PasswordReset from '../components/PasswordReset'
import ProtectedRoutes from '../components/ProtectedRoutes'
function App() {

const {token} = useContext(UserContext)

  return (
    <>
    {token && <Header />}

      <Routes>
        <Route path="/" element={token ? <Profile /> : <Auth />}/>

        <Route path='/recovery' element={ <Recovery /> }/>

        <Route path='/profile' element={
          <ProtectedRoutes
          token={token}
          >
              <Profile />
          </ProtectedRoutes>
        
        } />
        <Route path='/search' element={
          <ProtectedRoutes
          token={token}
          >
              <Search />
          </ProtectedRoutes>
        } />

        <Route path='/saved' element={
          <ProtectedRoutes
          token={token}
          >
              <SavedLoc />
          </ProtectedRoutes>
        } />

        <Route path='/settings' element={
          <ProtectedRoutes
          token={token}
          >
            <Settings />
          </ProtectedRoutes>
        }
        />
        <Route path='/changename' element={
          <ProtectedRoutes
          token={token}
          >
            <ChangeName />
          </ProtectedRoutes>
        }
        />

        <Route path='/changepassword' element={
          <ProtectedRoutes
          token={token}
          >
            <ChangePassword />
          </ProtectedRoutes>
        }
        />
        <Route path='/forecast/:location' element={
          <ProtectedRoutes
          token={token}
          >
              <LocDetails />
          </ProtectedRoutes>
        } />
        <Route path='/password-reset/:token' element={ <PasswordReset /> }/>

      </Routes>
    </>
  )
}

export default App

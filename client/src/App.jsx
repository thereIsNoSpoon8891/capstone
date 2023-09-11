import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import Profile from '../components/Profile'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Search from '../components/Search'
import SavedLoc from '../components/SavedLoc'
import Recovery from '../components/Recovery'
import LocDetails from '../components/LocDetails'
import PasswordChange from '../components/PasswordChange'
import ProtectedRoutes from '../components/ProtectedRoutes'

function App() {

const {token} = useContext(UserContext)

  return (
    <>
    {token && <Header />}

      <Routes>
        <Route path='/password-reset/:token' element={ <PasswordChange /> }/>
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

        <Route path='/forecast/:location' element={
          <ProtectedRoutes
          token={token}
          >
              <LocDetails />
          </ProtectedRoutes>
        } />
      </Routes>
    </>
  )
}

export default App

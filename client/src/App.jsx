import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import Profile from '../components/Profile'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Search from '../components/Search'

function App() {

const {token} = useContext(UserContext)

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} />
      </Routes>


    </>
  )
}

export default App

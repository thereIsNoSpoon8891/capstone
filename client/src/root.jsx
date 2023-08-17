import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from '../context/userContext.jsx'
import '../style/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <UserContextProvider>
              <App />
          </UserContextProvider>
      </Router>
  </React.StrictMode>
)

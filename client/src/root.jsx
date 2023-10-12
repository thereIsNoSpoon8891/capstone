import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from '../context/userContext.jsx'
import { LocationsContextProvider } from '../context/locationsContext.jsx'
import { ThemeContextProvider } from '../context/themeContext.jsx'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
          <UserContextProvider>
            <LocationsContextProvider>
              <ThemeContextProvider>

                      <App />

              </ThemeContextProvider>
            </LocationsContextProvider>
          </UserContextProvider>
    </Router>
  </React.StrictMode>
)

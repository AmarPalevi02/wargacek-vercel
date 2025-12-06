import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/leaflet-icon'
import AppRoute from './routes'
import { listen } from './redux/listener'

const App = () => {
  useEffect(() => {
    listen()
  }, [])
  
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  )
}

export default App
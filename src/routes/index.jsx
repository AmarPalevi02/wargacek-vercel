import React from 'react'
import LandingPage from '../pages/LandingPage'
import Register from '../pages/Register'
import Login from '../pages/Login'

import { Route, Routes } from 'react-router-dom'
import Laporan from '../pages/laporan'
import Profile from '../pages/profile'
import PrivateRoute from './PrivateRoute'
import GuestOnlyRoute from './GuestOnlyRoute'
import PantauRoutes from './Pantau'
import MapsRoute from './MapsRoute'

const AppRoute = () => {
   return (
      <Routes>
         {/* Public Routes */}
         <Route path='/' element={<LandingPage />} />

         <Route element={<GuestOnlyRoute />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
         </Route>

         {/* Protected Routes */}
         <Route element={<PrivateRoute />}>
            <Route path='/maps/*' element={<MapsRoute />} />
            <Route path='/tambahlaporan' element={<Laporan />} />
            <Route path='/pantau/*' element={<PantauRoutes />} />
            <Route path='/profile' element={<Profile />} />
         </Route>
      </Routes>
   )
}

export default AppRoute
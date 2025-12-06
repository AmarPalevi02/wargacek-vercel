import Cookies from 'js-cookie';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
   const { token } = Cookies.get('auth')
      ? JSON.parse(Cookies.get('auth'))
      : {};

   if (!token) return <Navigate to="/" replace={true} />;

   return <Outlet />;

}

export default PrivateRoute
import React from 'react'
import images from '../../assets'
import useAuthToken from '../../hooks/useAuthToken'
import Button from '../../components/ui/Button'

import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/auth/action';

const ProfileUser = () => {
   const { username, email } = useAuthToken()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleLogOut = () => {
      dispatch(userLogout())
      navigate('/login', { replace: true })
   }

   return (
      <div className="flex gap-3">
         <div className="">
            <div className="bg-gray-500 h-24 w-24 rounded-full flex justify-center ">
               <img
                  src={images.profile}
                  alt="profile"
                  loading="lazy"
               />
            </div>
         </div>

         <div className="flex flex-col justify-center gap-3">
            <div className="">
               <p className='font-semibold text-md'>{username}</p>
               <p className='text-sm text-gray-500'>{email}</p>
            </div>
            <Button
               size='md'
               variant='error'
               className='flex items-center justify-center gap-2'
               onClick={handleLogOut}
            >
               Log Out
               <MdLogout className='rotate-180 font-semibold' />
            </Button>
         </div>
      </div>
   )
}

export default ProfileUser
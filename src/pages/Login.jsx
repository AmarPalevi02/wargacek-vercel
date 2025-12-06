import React, { useState } from 'react'
import LogoMaps from '../components/LogoMaps'
import LogoWc from '../components/LogoWc'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Cookies from 'js-cookie'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'
import PageLayout from '../components/layout/PageLayout'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { postData } from '../utils/fetchDatas'
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/auth/action'
import { showAlert } from '../redux/alert/action'
import { configs } from '../configs/config'
import { FiRefreshCcw } from "react-icons/fi";
import { FiEye, FiEyeOff } from 'react-icons/fi'


const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLoading, setIsloading] = useState(false)
   const [showPassword, setShowPassword] = useState(false);
   const [captchaUrl, setCaptchaUrl] = useState(getCaptchaUrl());

   function getCaptchaUrl() {
      return `${configs.base_url_dev}${configs.version}/captcha?${Date.now()}`;
   }

   const refreshCaptcha = () => {
      setCaptchaUrl(getCaptchaUrl());
   };

   const handleLogin = async (data) => {
      setIsloading(true)
      try {
         const response = await postData(data, false, 'login')
         const { token, user } = response.data;

         const authPayload = {
            token,
            username: user.username,
            email: user.email,
            role: user.role,
            id: user.id
         };
         Cookies.set('auth', JSON.stringify(authPayload));

         dispatch(userLogin(token, user.username, user.email, user.role, user.id));

         navigate('/');

         setIsloading(false)
      } catch (error) {
         const message = error.response?.data?.message || 'Login gagal. Prikasa kemabali email dan password'
         dispatch(showAlert(`${message}`, 'error'))
         setIsloading(false)
      }
   }

   return (
      <PageLayout>
         <Alert />
         <div className="pt-5">
            <LogoMaps />
         </div>
         <div className="flex items-baseline gap-1 justify-center mt-4">
            <h1 className='text-2xl font-semibold'>Welcome</h1>
            <LogoWc className="text-2xl" />
         </div>

         <form
            className='mt-20'
            onSubmit={handleSubmit(handleLogin)}
         >
            <Input
               className="mb-7"
               type="email"
               name="email"
               id="email"
               label="Email"
               placeholder="Masukan email"
               register={register}
               error={errors.email}
               {...register('email', {
                  required: 'Email wajib di isi',
                  pattern: {
                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                     message: 'Invalid email address',
                  },
               })}
            />

            <div className="relative mb-7">
               <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  label="Password"
                  placeholder="Masukan Password"
                  error={errors.password}
                  register={register}
                  {...register('password', {
                     required: 'Password wajib di isi',
                     minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                     },
                  })}
               />

               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3 text-gray-500"
               >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
               </button>
            </div>

            <div className="flex items-center gap-2 mb-5">
               <div className="flex-1 relative">
                  <img
                     src={captchaUrl}
                     alt="captcha"
                     className="w-full h-14 object-contain bg-white rounded border border-gray-300"
                  />
                  <button
                     type="button"
                     onClick={refreshCaptcha}
                     className="absolute top-1 right-1 p-1 rounded bg-white hover:bg-gray-100 shadow-md"
                     aria-label="Refresh captcha"
                  >
                     <FiRefreshCcw className="text-gray-600 w-5 h-5" />
                  </button>
               </div>
            </div>

            <Input
               className="mb-7"
               type="text"
               name="captcha"
               id="captcha"
               label="Masukkan kode captcha"
               placeholder="Masukkan captcha di atas"
               error={errors.captcha}
               register={register}
               {...register('captcha', {
                  required: 'Captcha wajib diisi',
               })}
            />

            <Button
               type="submit"
               className='w-full'
               disabled={isLoading}
            >
               {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                     <Spinner />
                     Loading...
                  </div>
               ) : (
                  "Login"
               )}
            </Button>
         </form>

         <div className="flex gap-1 justify-center text-sm font-light items-center text-center mt-4">
            <p className='text-gray-600'>Belum punya akun? </p>
            <Link
               to={'/register'}
               className='text-indigo-700 text-sm'
            >
               Daftar
            </Link>
         </div>
      </PageLayout >
   )
}

export default Login
import React from 'react'
import images from '../assets'

const LogoMaps = () => {
   return (
      <div className="flex flex-col justify-center w-full items-center">
         <img
            src={images.logo}
            className='w-44'
            loading="lazy"
         />
         <div className="w-[150px] h-[4px] bg-[#ba1a1a] rounded-[10px]"></div>
      </div>
   )
}

export default LogoMaps
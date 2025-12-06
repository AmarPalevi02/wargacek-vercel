import React, { useEffect, useState } from 'react';
import useAuthToken from '../hooks/useAuthToken';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaPlus, FaUsers, FaUser } from 'react-icons/fa';

const Navbar = () => {
   const { token, username, email, role } = useAuthToken();
   const [showNavbar, setShowNavbar] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(window.scrollY);

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         if (currentScrollY > lastScrollY) {
            setShowNavbar(false);
         } else if (currentScrollY < lastScrollY - 10) {
            setShowNavbar(true);
         }

         setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
   }, [lastScrollY]);

   if (!(token && username && email && role)) return null;

   return (
      <div
         className={`fixed bottom-10 left-0 w-full z-50 flex justify-center transition-all duration-300 ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
      >
         <div className="w-full max-w-lg px-6">
            <nav className="w-full">
               <ul className="flex justify-evenly rounded-[30px] py-3 shadow-2xl bg-[#fff]">
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        `flex flex-col items-center ${isActive
                           ? 'text-[#328E6E] border-b-2 border-[#328E6E]'
                           : 'text-gray-600'
                        }`
                     }
                  >
                     <FaHome className="text-2xl" />
                     <p className="text-sm">Home</p>
                  </NavLink>

                  <NavLink
                     to="/maps"
                     className={({ isActive }) =>
                        `flex flex-col items-center ${isActive
                           ? 'text-[#328E6E] border-b-2 border-[#328E6E]'
                           : 'text-gray-600'
                        }`
                     }
                  >
                     <FaMapMarkerAlt className="text-2xl" />
                     <p className="text-sm">Map</p>
                  </NavLink>

                  <NavLink
                     to="/tambahlaporan"
                     className={({ isActive }) =>
                        `flex flex-col items-center ${isActive
                           ? 'text-[#328E6E] border-b-2 border-[#328E6E]'
                           : 'text-gray-600'
                        }`
                     }
                  >
                     <FaPlus className="text-3xl" />
                  </NavLink>

                  <NavLink
                     to="/pantau"
                     className={({ isActive }) =>
                        `flex flex-col items-center ${isActive
                           ? 'text-[#328E6E] border-b-2 border-[#328E6E]'
                           : 'text-gray-600'
                        }`
                     }
                  >
                     <FaUsers className="text-2xl" />
                     <p className="text-sm">Pantau</p>
                  </NavLink>

                  <NavLink
                     to="/profile"
                     className={({ isActive }) =>
                        `flex flex-col items-center ${isActive
                           ? 'text-[#328E6E] border-b-2 border-[#328E6E]'
                           : 'text-gray-600'
                        }`
                     }
                  >
                     <FaUser className="text-2xl" />
                     <p className="text-sm">Profile</p>
                  </NavLink>
               </ul>
            </nav>
         </div>
      </div>
   );
};

export default Navbar;

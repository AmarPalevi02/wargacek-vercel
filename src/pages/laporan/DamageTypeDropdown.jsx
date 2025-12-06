import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const DamageTypeDropdown = ({ data, selected, setSelected, open, setOpen }) => {
   const handleSelect = (item) => {
      setSelected(item);
      setOpen(false);
   };

   return (
      <div className="w-full max-w-sm">
         <label className="block font-semibold mb-2">Jenis kerusakan/kejadian</label>
         <div className="relative">
            <button
               type="button"
               onClick={() => setOpen(!open)}
               className="w-full text-left px-4 py-2 bg-gray-200 rounded-md flex items-center justify-between"
            >
               {selected?.jenis_kerusakan || 'pilih kerusakan/kejadian'}
               <IoIosArrowDown
                  className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
               />
            </button>

            {open && (
               <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                  {data?.length > 0 ? (
                     data.map((item) => (
                        <li
                           key={item.id}
                           onClick={() => handleSelect(item)}
                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                           {item.jenis_kerusakan}
                        </li>
                     ))
                  ) : (
                     <li className="px-4 py-2 text-gray-500">Data tidak tersedia</li>
                  )}
               </ul>
            )}
         </div>
      </div>
   )
}

export default DamageTypeDropdown

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/alert/action';

const Alert = () => {
   const dispatch = useDispatch();
   const { message, type, show, onConfirm } = useSelector((state) => state.alert);

   if (!show) return null;

   const typeColor = {
      success: 'bg-green-100 text-green-800 border-green-400',
      error: 'bg-red-100 text-red-800 border-red-400',
      info: 'bg-blue-100 text-blue-800 border-blue-400',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
   };

   const handleOk = () => {
      if (onConfirm) {
         onConfirm(); 
      }
      dispatch(hideAlert());
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
         <div className={`w-96 rounded-lg p-6 border shadow-lg ${typeColor[type] || typeColor.info}`}>
            <h2 className="text-lg font-semibold mb-3">Pesan</h2>
            <p className="mb-5 text-sm">{message}</p>

            <div className="flex gap-2">
               {onConfirm && (
                  <button
                     onClick={() => dispatch(hideAlert())}
                     className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full"
                  >
                     Batal
                  </button>
               )}
               <button
                  onClick={handleOk}
                  className="bg-[#3b82f6] text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
               >
                  OK
               </button>
            </div>
         </div>
      </div>
   );
};

export default Alert;


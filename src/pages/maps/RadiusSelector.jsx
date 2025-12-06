// import React from "react";
// import { radiusCOnfigs } from "../../configs/constans";
// import { useDispatch, useSelector } from "react-redux";
// import { setRadius } from "../../redux/getLaporanMap/action";

// const RadiusSelector = () => {
//   const dispatch = useDispatch();
//   const { radius, loading } = useSelector((state) => state.getLaporan);

//   const handleRadiusChange = (newRadius) => {
//     dispatch(setRadius(newRadius));
//   };
//   return (
//     <div className="absolute top-20 right-4 z-10 bg-white p-3 rounded-lg shadow-lg">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Radius Pencarian:
//       </label>
//       <div className="flex flex-col space-y-2">
//         {radiusCOnfigs.RADIUS_OPTIONS.map((option) => (
//           <button
//             key={option}
//             onClick={() => handleRadiusChange(option)}
//             disabled={loading}
//             className={`px-3 py-2 text-sm rounded-md transition-colors ${
//               radius === option
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {option} km {radius === option && "✓"}
//           </button>
//         ))}
//       </div>
//       {loading && <p className="text-xs text-gray-500 mt-2">Memuat data...</p>}
//     </div>
//   );
// };

// export default RadiusSelector;

import React, { useState } from "react";
import { radiusCOnfigs } from "../../configs/constans";
import { useDispatch, useSelector } from "react-redux";
import { setRadius } from "../../redux/getLaporanMap/action";

const RadiusSelector = () => {
  const dispatch = useDispatch();
  const { radius, loading } = useSelector((state) => state.getLaporan);
  const [isOpen, setIsOpen] = useState(false);

  const handleRadiusChange = (newRadius) => {
    dispatch(setRadius(newRadius));
    setIsOpen(false);
  };

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-20 right-4 z-10">
      {/* Tombol toggle dengan icon radius */}
      <button
        onClick={toggleSelector}
        disabled={loading}
        className={`bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
        title="Pilih radius pencarian"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium text-gray-700">{radius} km</span>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="bg-white p-3 rounded-lg shadow-lg mt-2 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Radius Pencarian:
          </label>
          <div className="flex flex-col space-y-2">
            {radiusCOnfigs.RADIUS_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleRadiusChange(option)}
                disabled={loading}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  radius === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {option} km {radius === option && "✓"}
              </button>
            ))}
          </div>
          {loading && (
            <p className="text-xs text-gray-500 mt-2">Memuat data...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RadiusSelector;

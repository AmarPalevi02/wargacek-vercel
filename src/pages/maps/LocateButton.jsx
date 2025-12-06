import { IoLocateSharp } from "react-icons/io5";

const LocateButton = ({ onClick }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className="absolute z-[1000] bottom-56 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
         <IoLocateSharp className="text-2xl text-black" />
      </button>
   );
}

export default LocateButton

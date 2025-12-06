import { IoIosArrowUp } from "react-icons/io";

const ToggleFormButton = ({ showForm, onClick }) => {
   return (
      <button
         onClick={onClick}
         className={`absolute z-20 bottom-40 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition ${showForm ? "rotate-180 bottom-64" : ""
            }`}
      >
         <IoIosArrowUp className="text-2xl transition-transform" />
      </button>
   );
}

export default ToggleFormButton
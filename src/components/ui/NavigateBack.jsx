import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NavigateBack = ({ back }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(back)}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
    >
      <FaArrowLeft />
      <span>Kembali</span>
    </button>
  );
};

import React from "react";

const DestinationSuggestions = ({
  suggestions,
  onSelect,
  isLoading,
  position = "bottom",
}) => {
  if (isLoading) {
    return (
      <div
        className={`absolute ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto`}
      >
        <div className="p-3 text-gray-500 text-center">Mencari...</div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto`}>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
          onClick={() => onSelect(suggestion)}
        >
          <div className="font-medium text-gray-800">
            {suggestion.display_name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {parseFloat(suggestion.lat).toFixed(6)},{" "}
            {parseFloat(suggestion.lon).toFixed(6)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationSuggestions;

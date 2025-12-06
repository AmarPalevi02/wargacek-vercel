import React, { useState, useEffect, useRef } from "react";
import DestinationSuggestions from "./DestinationSuggestions";

const DestinationForm = ({ showForm, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Reset form ketika showForm berubah
  useEffect(() => {
    if (showForm) {
      // Focus input ketika form ditampilkan
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      // Reset state ketika form disembunyikan
      setInputValue("");
      setSuggestions([]);
    }
  }, [showForm]);

  // Debounce untuk mengurangi request API
  useEffect(() => {
    if (!showForm) return;

    if (!inputValue.trim() || inputValue.length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, showForm]);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=5&addressdetails=1`
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    const value = `${suggestion.lat}, ${suggestion.lon}`;
    setInputValue(suggestion.display_name);
    setSuggestions([]);

    // Trigger form submission dengan data yang dipilih
    const mockEvent = {
      preventDefault: () => {},
      target: {
        destination: { value: value },
      },
    };
    onSubmit(mockEvent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    onSubmit(e);
  };

  if (!showForm) return null;

  return (
    <div
      className={`absolute z-[1000] left-6 right-6 bg-white p-4 rounded-md shadow-lg transition-all duration-500 ease-in-out ${
        showForm
          ? "bottom-32 opacity-100 translate-y-0"
          : "-bottom-60 opacity-0 translate-y-10"
      }`}
    >
      <DestinationSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
        isLoading={isLoading}
        position="top"
      />
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            name="destination"
            placeholder="Masukkan lokasi tujuan"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Cari
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
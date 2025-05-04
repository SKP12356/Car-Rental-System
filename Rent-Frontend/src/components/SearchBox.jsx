import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { CarContext } from "../store/carStore";

const SearchBox = () => {
  const { searchCars } = useContext(CarContext);

  const handleSearch = (event) => {
    searchCars(event.target.value);
  };

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          onChange={handleSearch}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FiSearch size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

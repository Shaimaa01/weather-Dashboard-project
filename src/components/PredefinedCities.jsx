/* eslint-disable react/prop-types */
import { useState } from "react";
import FetchCities from "../services/FetchCityNames";

const PredefinedCities = ({ handlePredefinedCityClick }) => {
  // List of predefined cities
  const predefinedCities = FetchCities();

  // State to track whether the list is visible
  const [isListVisible, setIsListVisible] = useState(false);

  // Function to toggle list visibility
  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <>
      {/* Icon to toggle the list */}
      <i
        className={`fa-solid fa-list text-lg cursor-pointer transition-colors ${
          isListVisible ? "text-white" : "text-gray-500"
        }`}
        onClick={toggleListVisibility}
      ></i>

      {/* Conditional rendering for the list */}
      {isListVisible && (
        <div
          className=" pt-5 pb-5 mr-10 border-b border-[#9EA7A6] overflow-y-auto"
          style={{ maxHeight: "300px" }}
        >
          {predefinedCities.map((predefinedCity) => (
            <button
              key={predefinedCity}
              onClick={() => handlePredefinedCityClick(predefinedCity)}
              className="block text-[#979fa1] font-semibold text-md hover:bg-[#71858317] hover:text-[#E0E3E3] rounded w-full text-start py-3 my-1"
            >
              {predefinedCity}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PredefinedCities;

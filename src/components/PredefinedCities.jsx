/* eslint-disable react/prop-types */
import FetchCities from "../services/FetchCityNames";

const PredefinedCities = ({ handlePredefinedCityClick }) => {
  // List of predefined cities
  const predefinedCities = FetchCities();

  return (
    <>
      <div
        className=" pt-5 pb-5  border-b border-[#9EA7A6] overflow-y-auto w-full"
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
    </>
  );
};

export default PredefinedCities;

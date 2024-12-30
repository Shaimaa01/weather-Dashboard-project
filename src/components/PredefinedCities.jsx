/* eslint-disable react/prop-types */
import FetchCities from "../services/FetchCityNames";
import SidebarMenu from "./SidebarMenu";

const PredefinedCities = ({
  handlePredefinedCityClick,
  isDarkMode,
  toggleDarkMode,
}) => {
  // List of predefined cities
  const predefinedCities = FetchCities();

  return (
    <div className=" sm:flex gap-6 justify-between  pb-6   ">
      <SidebarMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className=" overflow-y-auto w-full max-h-96 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-gray-500  scrollbar-track-gray-800">
        {predefinedCities.map((predefinedCity) => (
          <button
            key={predefinedCity}
            onClick={() => handlePredefinedCityClick(predefinedCity)}
            className="block text-gray-500 font-semibold text-md hover:bg-[#71858317] hover:text-sky-300 rounded w-full text-start py-3 my-1 pl-4"
          >
            {predefinedCity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PredefinedCities;

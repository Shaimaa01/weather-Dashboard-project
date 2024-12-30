/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const SidebarMenu = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation(); // To track the current route

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      } rounded-3xl px-4 text-xl py-5 flex flex-col gap-7 items-center max-sm:flex-row max-sm:px-4 max-sm:p-2 max-sm:mb-4 max-sm:justify-evenly max-sm:bg-transparent`}
    >
      {/* Umbrella Icon */}
      <i className="fa-solid fa-umbrella text-sky-300 p-2 rounded-lg mb-5 max-sm:m-0"></i>

      {/* Weather Link */}
      <div
        className={`text-center cursor-pointer transition-colors ${
          isActive("/home")
            ? isDarkMode
              ? "text-slate-300"
              : "text-gray-900"
            : "text-gray-500"
        }`}
      >
        <Link to="/home">
          <i className="fa-solid fa-cloud-moon-rain"></i>
          <p className="text-sm font-medium">Weather</p>
        </Link>
      </div>

      {/* Cities Link */}
      <div
        className={`text-center cursor-pointer transition-colors ${
          isActive("cities")
            ? isDarkMode
              ? "text-slate-300"
              : "text-gray-900"
            : "text-gray-500"
        }`}
      >
        <Link to="cities">
          <i className="fa-solid fa-list"></i>
          <p className="text-sm font-medium">Cities</p>
        </Link>
      </div>

      {/* Map Link */}
      <div
        className={`text-center cursor-pointer transition-colors ${
          isActive("map")
            ? isDarkMode
              ? "text-slate-300"
              : "text-gray-900"
            : "text-gray-500"
        }`}
      >
        <Link to="map">
          <i className="fa-solid fa-map"></i>
          <p className="text-sm font-medium">Map</p>
        </Link>
      </div>

      {/* Dark Mode Toggle */}
      <div
        className={`text-center cursor-pointer transition-colors duration-300 ${
          isDarkMode ? "text-gray-500" : "text-yellow-500"
        }`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <i className="fa-solid fa-moon text-gray-500"></i>
        ) : (
          <i className="fa-solid fa-sun text-yellow-500"></i>
        )}
        <p className="text-sm font-medium">{isDarkMode ? "Dark" : "Light"}</p>
      </div>
    </div>
  );
};

export default SidebarMenu;

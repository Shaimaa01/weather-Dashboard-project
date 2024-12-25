/* eslint-disable react/prop-types */
import PredefinedCities from "./PredefinedCities.jsx";
import CityTimeFetcher from "./CityTimeFetcher.jsx";
import WeatherForDays from "./WeatherForDays.jsx";
import WeatherForHours from "./WeatherForHours.jsx";
import CityMap from "./CityMap.jsx";
import WeatherIcon from "./WeatherIcon.jsx";
import { useState } from "react";

const WeatherDashboardDisplayed = ({
  weatherData,
  city,
  setCity,
  handleSearch,
  handlePredefinedCityClick,
  error,
}) => {
  const [visibleContent, setVisibleContent] = useState("WeatherForHours");

  // Toggle between content and null
  const handleIconClick = (content) => {
    setVisibleContent((prev) => (prev === content ? null : content));
  };

  if (weatherData) {
    return (
      // container
      <div className=" flex gap-8 justify-between p-8 bg-gray-950">
        {/* First column */}
        <div className="bg-gray-800  rounded-3xl px-4 text-xl py-5 flex flex-col gap-7 items-center ">
          <i className="fa-solid fa-wind text-sky-300 bg-gray-600 p-2 rounded-lg mb-6 "></i>

          {/* icon to control weather */}
          <div
            className={`text-center cursor-pointer transition-colors ${
              visibleContent === "WeatherForHours"
                ? "text-slate-300"
                : "text-gray-500"
            }`}
          >
            <i
              className="fa-solid fa-cloud-moon-rain"
              onClick={() => {
                handleIconClick("WeatherForHours");
              }}
            ></i>
            <p className="text-sm font-medium ">Weather</p>
          </div>

          {/* icon to control cities */}
          <div
            className={`text-center cursor-pointer transition-colors ${
              visibleContent === "PredefinedCities"
                ? "text-slate-300"
                : "text-gray-500"
            }`}
          >
            <i
              className="fa-solid fa-list"
              onClick={() => {
                handleIconClick("PredefinedCities");
              }}
            ></i>
            <p className="text-sm font-medium ">Cities</p>
          </div>

          {/* icon to control Map */}
          <div
            className={`text-center cursor-pointer transition-colors ${
              visibleContent === "CityMap" ? "text-slate-300" : "text-gray-500"
            }`}
          >
            <i
              className="fa-solid fa-map"
              onClick={() => {
                handleIconClick("CityMap");
              }}
            ></i>
            <p className="text-sm font-medium ">Cities</p>
          </div>
        </div>

        {/* Second colmun */}
        <div className="w-full">
          {/* Search part  */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search for cities"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              className="   h-10 w-full focus:outline-none bg-gray-800   text-slate-300 font-medium text-sm pl-4 rounded-xl "
            />
            <button onClick={handleSearch}>
              <i className="fas fa-search text-sky-300 text-xl -ml-14"></i>
            </button>
          </div>

          {/* container for temp , data , city ,icon */}
          {visibleContent === "WeatherForHours" && (
            <div className="flex justify-between text-slate-300 m-5">
              <div className="flex flex-col justify-between">
                <div className="">
                  <p className="font-bold text-3xl ">{weatherData.name}</p>
                  <div className="text-gray-500 font-semibold">
                    <CityTimeFetcher
                      lat={weatherData.coord.lat}
                      lng={weatherData.coord.lon}
                    />
                  </div>
                </div>
                <p className="font-bold text-5xl">
                  {Math.round(weatherData.main.temp)}°
                </p>
              </div>

              {/* icon */}

              <WeatherIcon
                iconCode={weatherData.weather[0].icon}
                className="w-40 h-40 my-auto "
              />
            </div>
          )}

          {/* hours forcast */}
          {visibleContent === "WeatherForHours" && (
            <WeatherForHours city={weatherData.name} />
          )}

          {/* cities */}
          {visibleContent === "PredefinedCities" && (
            <PredefinedCities
              handlePredefinedCityClick={handlePredefinedCityClick}
            />
          )}

          {/* CityMap */}
          {visibleContent === "CityMap" && (
            <CityMap lat={weatherData.coord.lat} lng={weatherData.coord.lon} />
          )}

          {/* Weather details */}
          <div className=" text-gray-500 bg-gray-800 my-5 p-6 rounded-3xl  ">
            <h2 className=" uppercase font-bold tracking-tight  text-sm">
              air conditions
            </h2>

            <p className="">
            <i className="fa-solid fa-cloud"></i>
            Cloudy:
              <span className="text-slate-300"> {weatherData.clouds.all}%</span>
            </p>

            <p className="">
            <i className="fa-solid fa-tint"></i>
            Humidity:
              <span className="text-slate-300">
              {weatherData.main.humidity}%
              </span>
            </p>

            <p className="">
            <i className="fa-solid fa-wind"></i>
            Wind:
              <span className="text-slate-300"> {weatherData.wind.speed} m/s</span>
            </p>

            <p className="">
            <i className="fa-solid   fa-thermometer-half"></i>
            Description:
              <span className="text-slate-300">
              {weatherData.weather[0].description}
              </span>
            </p>
          </div>
        </div>

        {/* Third colmun */}
        <div className="">
          <WeatherForDays city={weatherData.name} />
        </div>
      </div>
    );
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Loading...</h2>
    </div>
  );
};

export default WeatherDashboardDisplayed;

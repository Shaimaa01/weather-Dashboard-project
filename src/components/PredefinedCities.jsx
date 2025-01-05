/* eslint-disable react/prop-types */
import SidebarMenu from "./SidebarMenu";
import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import WeatherIcon from "./WeatherIcon";
import CityTimeFetcher from "./CityTimeFetcher";
import WeatherForThreeHours from "./WeatherForThreeHours";
import WeatherForThreeDays from "./WeatherForThreeDays";

const PredefinedCities = ({
  handlePredefinedCityClick,
  isDarkMode,
  toggleDarkMode,
  city,
  setCity,
  handleSearch,
  predefinedCities,
  weatherData,
}) => {
  const [cityWeatherData, setCityWeatherData] = useState(
    JSON.parse(localStorage.getItem("citiesData")) || {}
  );

  useEffect(() => {
    const fetchCityWeather = async () => {
      for (const city of predefinedCities) {
        try {
          const data = await getWeather(city);
          setCityWeatherData((prevData) => ({
            ...prevData,
            [city]: {
              temp: data.main.temp,
              icon: data.weather[0].icon,
              lat: data.coord.lat,
              lon: data.coord.lon,
            },
          }));
        } catch (error) {
          console.error(`Failed to fetch weather for ${city}:`, error);
        }
      }
    };

    fetchCityWeather();
  }, [predefinedCities]);

  // Update localStorage only when cityWeatherData changes
  useEffect(() => {
    if (cityWeatherData) {
      localStorage.setItem("citiesData", JSON.stringify(cityWeatherData));
    }
  }, [cityWeatherData]);

  return (
    // container
    <div
      className={` ${
        isDarkMode ? "bg-gray-950 text-slate-300" : "bg-slate-50 text-black"
      }  min-h-screen p-6 pb-0`}
    >
      {/* child container */}
      <div className=" sm:flex gap-6 justify-between pb-10  min-h-screen ">
        {/* First column */}
        <SidebarMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Second colmun */}
        <div className="flex-1">
          {/* Search part  */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search for cities"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              className={` h-10 w-full focus:outline-none ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }   font-medium text-sm pl-4 rounded-xl `}
            />
            <button onClick={handleSearch}>
              <i className="fas fa-search text-sky-300 text-xl -ml-14"></i>
            </button>
          </div>

          {/* cities part */}
          {predefinedCities.map((city) => (
            <div
              key={city}
              onClick={() => handlePredefinedCityClick(city)}
              className=""
            >
              <div
                className={`mt-4 flex justify-between items-center rounded-3xl px-6 py-1 hover:border-2 hover:border-sky-700 hover:bg-transparent transition duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                {cityWeatherData[city] && (
                  <>
                    <div className="flex items-center">
                      {/* icon */}
                      <WeatherIcon
                        iconCode={cityWeatherData[city].icon}
                        className="w-28 h-28 my-auto "
                      />

                      {/*City and Data */}
                      <div className="ml-2">
                        <p className="font-bold text-2xl pb-2">{city}</p>
                        <div className="text-gray-500 font-semibold">
                          <CityTimeFetcher
                            lat={cityWeatherData[city].lat}
                            lng={cityWeatherData[city].lon}
                          />
                        </div>
                      </div>
                    </div>

                    {/* tempreture */}
                    <p className="text-3xl font-semibold">
                      {Math.round(cityWeatherData[city].temp)}°
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Third colmun */}
        <div
          className={` w-1/4 self-end  max-lg:hidden ${
            isDarkMode ? " text-slate-300 " : "text-black "
          }`}
        >
          {/* container for temp , data , city ,icon */}
          {weatherData && (
            <div
              className={`flex justify-between pb-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-slate-300"
              } `}
            >
              <div className="flex flex-col justify-between ">
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
          <div
            className={` py-4 border-b ${
              isDarkMode ? "border-gray-700" : "border-slate-300"
            }`}
          >
            {weatherData && (
              <WeatherForThreeHours
                city={weatherData.name}
                isDarkMode={isDarkMode}
              />
            )}
          </div>

          {/* days forcast */}
          <div className={` pt-4 pb-0 max-lg:hidden `}>
            {weatherData && (
              <WeatherForThreeDays
                city={weatherData.name}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredefinedCities;

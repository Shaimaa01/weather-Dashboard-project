/* eslint-disable react/prop-types */
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import SidebarMenu from "./SidebarMenu";
import "../App.css";
import { getWeather } from "../services/weatherService";
import WeatherIcon from "./WeatherIcon";
import CityTimeFetcher from "./CityTimeFetcher";

const CityMap = ({
  isDarkMode,
  toggleDarkMode,
  city,
  setCity,
  handleSearch,
  predefinedCities,
  handlePredefinedCityClick,
}) => {
  const [position, setPosition] = useState([0, 0]);
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

  // Handle the initial center based on one city's lat/lng (e.g., first city)
  useEffect(() => {
    if (predefinedCities.length > 0 && cityWeatherData[predefinedCities[0]]) {
      const firstCity = predefinedCities[0];
      setPosition([
        cityWeatherData[firstCity]?.lat || 0,
        cityWeatherData[firstCity]?.lon || 0,
      ]);
    }
  }, [cityWeatherData, predefinedCities]);

  // styleing zoom in out
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--leaflet-bg-color",
      isDarkMode ? "#1f2937" : "#c8cbd1"
    );
    document.documentElement.style.setProperty(
      "--leaflet-text-color",
      isDarkMode ? "#fff" : "#6b7280"
    );
    document.documentElement.style.setProperty(
      "--leaflet-border-color",
      isDarkMode ? "#ddd" : "#000"
    );
    document.documentElement.style.setProperty(
      "--leaflet-hover-bg-color",
      isDarkMode ? "#030712" : "#f8fafc"
    );
  }, [isDarkMode]);

  return (
    // Container
    <div
      className={` ${
        isDarkMode ? "bg-gray-950 text-slate-300" : "bg-slate-50 text-black"
      }  min-h-screen p-6 pb-0`}
    >
      {/* child container */}
      <div className=" sm:flex gap-6 justify-between  pb-8 min-h-screen max-sm:block ">
        {/* First column */}
        <SidebarMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Second colmun */}
        <div className="flex-1 max-h-full">
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

          {/* map*/}
          <div
            className="rounded-2xl m-auto mt-6 shadow-md shadow-gray-900/50  "
            style={{
              height: "calc(100vh - 100px)",
            }}
          >
            <MapContainer
              center={position}
              zoom={2}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
              className="rounded-2xl p-0 m-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Loop through predefined cities and add markers with popups */}
              {predefinedCities &&
                cityWeatherData &&
                predefinedCities.map((city) => {
                  const weather = cityWeatherData[city];
                  if (!weather || !weather.lat || !weather.lon) {
                    console.warn(
                      `Weather data not available for city: ${city}`
                    );
                    return null;
                  }
                  return (
                    <Marker key={city} position={[weather.lat, weather.lon]}>
                      <Tooltip
                        direction="top"
                        offset={[0, -10]}
                        opacity={1}
                        permanent
                      >
                        <div
                          className={`${
                            isDarkMode
                              ? "bg-gray-700 text-slate-300"
                              : "bg-gray-200 text-gray-900"
                          } py-4 px-8 rounded-2xl text-center`}
                        >
                          <p className="font-bold text-2xl -mb-4">{city}</p>

                          <WeatherIcon
                            iconCode={weather.icon}
                            className="w-24 h-24 m-auto"
                          />

                          <div className="text-2xl font-medium -mt-4">
                            {Math.round(weather.temp)}°
                          </div>
                        </div>
                      </Tooltip>
                    </Marker>
                  );
                })}
            </MapContainer>
          </div>
        </div>

        {/* Third colmun */}
        <div
          className={` w-1/4 mt-12  max-xl:hidden ${
            isDarkMode ? " text-slate-300 " : "text-black "
          }`}
        >
          {/* cities part */}
          {predefinedCities.map((city) => (
            <div
              key={city}
              onClick={() => handlePredefinedCityClick(city)}
              className=""
            >
              <div
                className={`mt-4 flex justify-between items-center rounded-3xl px-6 py-1 pl-1 hover:border-2 hover:border-sky-700 hover:bg-transparent transition duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                {cityWeatherData[city] && (
                  <>
                    <div className="flex items-center">
                      {/* icon */}
                      <WeatherIcon
                        iconCode={cityWeatherData[city].icon}
                        className="w-20 h-20 my-auto "
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
      </div>
    </div>
  );
};

export default CityMap;

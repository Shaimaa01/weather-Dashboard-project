/* eslint-disable react/prop-types */
import CityTimeFetcher from "./CityTimeFetcher.jsx";
import SidebarMenu from "./SidebarMenu.jsx";
import WeatherForDays from "./WeatherForDays.jsx";
import WeatherForHours from "./WeatherForHours.jsx";
import WeatherIcon from "./WeatherIcon.jsx";

const WeatherDashboardDisplayed = ({
  weatherData,
  city,
  setCity,
  handleSearch,
  error,
  isDarkMode,
  toggleDarkMode,
}) => {
  if (weatherData) {
    return (
      // container
      <div
        className={` ${
          isDarkMode ? "bg-gray-950 text-slate-300" : "bg-slate-50 text-black"
        }  min-h-screen p-6 `}
      >
        <div className=" sm:flex gap-6 justify-between  pb-6   ">
          {/* First column */}
          <SidebarMenu
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />

          {/* Second colmun */}
          <div className="w-full">
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

            {/* container for temp , data , city ,icon */}

            <div className="flex justify-between  m-5">
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

            {/* hours forcast */}

            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              } rounded-3xl  p-6`}
            >
              <WeatherForHours
                city={weatherData.name}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Weather details */}
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }  mt-5 p-6 rounded-3xl  `}
            >
              <h2 className=" uppercase font-bold tracking-tight  text-sm">
                air conditions
              </h2>

              <div className="flex flex-wrap ">
                <p className="w-1/2 my-4 font-semibold text-md text-gray-500 ">
                  <i className="fa-solid fa-cloud mr-3 text-lg"></i>
                  Cloudy
                  <span
                    className={`font-bold text-xl block ml-8 mt-1 ${
                      isDarkMode ? "text-slate-300" : "text-black"
                    }`}
                  >
                    {weatherData.clouds.all}%
                  </span>
                </p>
                <p className="w-1/2 my-4 font-semibold text-md text-gray-500 ">
                  <i className="fa-solid fa-tint mr-3 text-lg"></i>
                  Humidity
                  <span
                    className={`font-bold text-xl block ml-6 mt-1 ${
                      isDarkMode ? "text-slate-300" : "text-black"
                    }`}
                  >
                    {weatherData.main.humidity}%
                  </span>
                </p>
                <p className="w-1/2 font-semibold text-md text-gray-500">
                  <i className="fa-solid fa-wind mr-3 text-lg"></i>
                  Wind
                  <span
                    className={` font-bold text-xl block ml-7 mt-1 ${
                      isDarkMode ? "text-slate-300" : "text-black"
                    }`}
                  >
                    {weatherData.wind.speed} m/s
                  </span>
                </p>
                <p className="w-1/2 font-semibold text-md text-gray-500">
                  <i className="fa-solid  fa-thermometer-half mr-3 text-lg"></i>
                  Description
                  <span
                    className={` font-bold text-xl block ml-6 mt-1 ${
                      isDarkMode ? "text-slate-300" : "text-black"
                    }`}
                  >
                    {weatherData.weather[0].description}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Third colmun */}
          <div
            className={`self-end rounded-3xl px-6 pt-8 pb-0 max-lg:hidden ${
              isDarkMode
                ? "bg-gray-800 text-slate-300"
                : "bg-gray-200 text-black"
            }`}
          >
            <WeatherForDays city={weatherData.name} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/*  for small media */}
        <div
          className={`self-end rounded-3xl px-6 pt-8  ml-28  lg:hidden   max-sm:ml-0 ${
            isDarkMode ? "bg-gray-800 text-slate-300" : "bg-gray-200 text-black"
          } `}
        >
          <WeatherForDays city={weatherData.name} isDarkMode={isDarkMode} />
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



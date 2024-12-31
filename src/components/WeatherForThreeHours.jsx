/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getForecast } from "../services/WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import "../App.css";

const WeatherForThreeHours = ({ city, isDarkMode }) => {
  if (city) {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchForecast = async () => {
        try {
          const data = await getForecast(city);
          setForecastData(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchForecast();
    }, [city]);

    // Function to convert 24-hour time to 12-hour format with AM/PM
    const convertTo12HourFormat = (timeStr) => {
      const time24 = parseInt(timeStr.split(" ")[1].slice(0, 2));
      const hour12 = (time24 % 12 || 12).toString().padStart(2, "0");
      const period = time24 >= 12 ? "PM" : "AM";
      return `${hour12}:${timeStr.split(" ")[1].slice(3, 5)} ${period}`;
    };

    //  get The hours forcast data
    const hoursData = forecastData?.list.slice(0, 3) || [];

    return (
      <>
        {error && <div>Error: {error}</div>}
        <h3 className="text-gray-500  uppercase font-bold tracking-tight pb-4 text-sm ">
          today&apos;sForecast
        </h3>
        <div className="grid grid-cols-3  text-center justify-items-stretch content-end">
          {hoursData.length > 0 ? (
            hoursData.map((hour, index) => (
              <div
                className={`${
                  isDarkMode ? "borderRight" : "borderRight-light"
                } px-1 `}
                key={index}
              >
                <p className="text-gray-500 font-bold max-xl:font-medium ">
                  {convertTo12HourFormat(hour.dt_txt)}
                </p>
                <WeatherIcon
                  iconCode={hour.weather[0].icon}
                  className="w-20 h-20 m-auto max-xl:w-16 max-xl:h-16 max-sm:w-10 max-sm:h-10"
                />
                <p className="font-bold text-2xl max-xl:text-xl">
                  {Math.round(hour.main.temp)}°
                </p>
              </div>
            ))
          ) : (
            <p>
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </p>
          )}
        </div>
      </>
    );
  }
};

export default WeatherForThreeHours;

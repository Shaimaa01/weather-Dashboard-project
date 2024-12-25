/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getForecast } from "../services/WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import "../App.css";

const WeatherForHours = ({ city }) => {
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
    const hoursData = forecastData?.list.slice(0, 6) || [];

    return (
      <div className="bg-gray-800  rounded-3xl  text-slate-300 p-6">
        {error && <div>Error: {error}</div>}
        <h3 className="text-gray-500  uppercase font-bold tracking-tight pb-4 text-sm">
          today&apos;sForecast
        </h3>
        <div className="grid grid-cols-6  text-center justify-items-stretch content-end">
          {hoursData.length > 0 ? (
            hoursData.map((hour, index) => (
              <div className="borderRight " key={index}>
                <p className="text-gray-500 font-bold">
                  {convertTo12HourFormat(hour.dt_txt)}
                </p>
                <WeatherIcon iconCode={hour.weather[0].icon} className="w-20 h-20 m-auto" />
                <p className="font-bold text-2xl">
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
      </div>
    );
  }
};

export default WeatherForHours;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getForecast } from "../services/WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import "../App.css";

const WeatherForDays = ({ city, isDarkMode }) => {
  if (city) {
    const [forecastData, setForecastData] = useState(
      JSON.parse(localStorage.getItem(`${city}-forecast`)) || null
    );
    const [error, setError] = useState("");

    // Function to calculate time until midnight
    const timeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Set to next midnight (12 AM)
      return midnight - now;
    };

    useEffect(() => {
      const fetchForecast = async () => {
        try {
          const data = await getForecast(city);

          setForecastData(data);

          localStorage.setItem(`${city}-forecast`, JSON.stringify(data));
        } catch (err) {
          setError(err.message);
        }
      };

      fetchForecast();

      const intervalId = setInterval(fetchForecast, timeUntilMidnight());

      return () => clearInterval(intervalId);
    }, [city]);

    // Function to get the unique forecast data
    const getUniqueForecast = (forecastData) => {
      return [
        ...new Map(
          forecastData.list.map((day) => [
            new Date(day.dt * 1000).toLocaleDateString(), // Date as key
            day, // Value (day data)
          ])
        ).values(),
      ];
    };

    // Function to handle data formate
    const formatForecast = (day, isFirstDay) => {
      const date = new Date(day.dt * 1000);
      const dayOfWeek = isFirstDay
        ? "Today"
        : date.toLocaleString("en-us", { weekday: "short" });
      const weatherDescription = day.weather[0].main;
      const tempMin = Math.round(day.main.temp_min);
      const tempMax = Math.round(day.main.temp_max);
      const iconCode = day.weather[0].icon;

      // Return the formatted string
      return (
        <div className="flex justify-between items-center py-2  ">
          <p className="min-w-[63px] text-gray-500 font-medium ">{dayOfWeek}</p>

          <div className="flex items-center justify-start  w-[142px] mx-4">
            <WeatherIcon iconCode={iconCode} className="w-20 h-20 " />
            <p className="font-medium pr-4">{weatherDescription}</p>
          </div>

          <p className="font-medium  min-w-[63px] text-right">
            {tempMin}
            <span className="text-gray-500">/{tempMax}</span>
          </p>
        </div>
      );
    };

    return (
      <>
        {error && <p>{error}</p>}
        <h2 className="text-gray-500 uppercase font-bold tracking-tight text-sm">
          6-Day forecast
        </h2>
        {forecastData ? (
          <ul
            className={`${
              isDarkMode ? "custom-border" : "custom-border-light"
            }`}
          >
            {getUniqueForecast(forecastData).map((day, index) => (
              <li key={index}>{formatForecast(day, index === 0)}</li>
            ))}
          </ul>
        ) : (
          <p>
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </p>
        )}
      </>
    );
  }
};
export default WeatherForDays;

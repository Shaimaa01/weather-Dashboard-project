/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getForecast } from "../services/WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import "../App.css";

const WeatherForDays = ({ city }) => {
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
        <div className="flex justify-between items-center py-1  ">
          <p className="min-w-[63px] text-gray-500 ">{dayOfWeek}</p>
          <div className="flex items-center justify-start   w-[142px] ">
            <div>
              <WeatherIcon iconCode={iconCode} />
            </div>
            <p className="font-medium pr-4">{weatherDescription}</p>
          </div>
          <p className="font-medium   min-w-[63px] text-right">
            {tempMin}
            <span className="text-gray-500">/{tempMax}</span>
          </p>
        </div>
      );
    };

    return (
      <div className="bg-gray-800  rounded-3xl my-10 mx-10 text-slate-300 px-8 py-10 ">
        {error && <p>{error}</p>}
        <h2 className="text-gray-500 uppercase font-bold tracking-tight  text-sm">
          7-Dayforcast
        </h2>
        {forecastData ? (
          <ul className=" custom-border">
            {getUniqueForecast(forecastData).map((day, index) => (
              <li className="" key={index}>
                {formatForecast(day, index === 0)}
              </li>
            ))}
          </ul>
        ) : (
          <p><i className="fas fa-spinner fa-spin"></i> Loading...</p>
        )}
      </div>
    );
  }
};

export default WeatherForDays;



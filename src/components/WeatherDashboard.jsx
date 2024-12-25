import { useState, useEffect } from "react";
import { getWeather } from "../services/weatherService.js";
import WeatherDashboardDisplayed from "./WeatherDashboardDisplayed.jsx";

const WeatherDashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("");

  //   to handle predfined citys
  const handlePredefinedCityClick = async (selectedCity) => {
    setCity(selectedCity);

    try {
      setError("");

      const data = await getWeather(selectedCity);

      setWeatherData(data);

      saveToLocalStorage(data);

      setTimeout(() => {
        setCity("");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch weather data on load if available in localStorage
  useEffect(() => {
    const storedWeather = getFromLocalStorage();

    if (storedWeather) {
      setWeatherData(storedWeather.data);
    }
  }, []);

  // Set the interval to fetch the weather data every 30 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getWeather(getFromLocalStorage()?.data?.name);
        console.log("Updated weather data:", data);
        setWeatherData(data);
        saveToLocalStorage(data);
      } catch (error) {
        console.error("Failed to update weather data:", error);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  });

  // Handle search and fetch new weather data
  const handleSearch = async () => {
    try {
      setError("");

      const data = await getWeather(city);

      setWeatherData(data);

      saveToLocalStorage(data);

      setCity("");

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("City not found or API error");
    }
  };

  // Save weather data to localStorage with timestamp
  const saveToLocalStorage = (data) => {
    const weatherData = {
      data,
    };
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
  };

  // Retrieve weather data from localStorage if valid
  const getFromLocalStorage = () => {
    const weatherData = localStorage.getItem("weatherData");
    if (weatherData) {
      const parsedData = JSON.parse(weatherData);
      return parsedData;
    }
    return null;
  };

  // defualt city when it is first time to open the web
  useEffect(() => {
    if (!localStorage.getItem("weatherData")) {
      const fetchData = async () => {
        try {
          setError("");

          const data = await getWeather("Cairo");

          setWeatherData(data);

          saveToLocalStorage(data);

          setCity("");
        } catch (error) {
          setError(error.message);
        }
      };

      fetchData(); // Call the fetch function
    } else {
      console.log(" Local Storage not empty");
    }
  }, []);

  console.log(weatherData)

  return (
    <WeatherDashboardDisplayed
      weatherData={weatherData}
      city={city}
      setCity={setCity}
      handleSearch={handleSearch}
      handlePredefinedCityClick={handlePredefinedCityClick}
      error={error}
    />
  );
};

export default WeatherDashboard;

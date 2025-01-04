/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getWeather } from "../services/weatherService.js";
import WeatherDashboardDisplayed from "./WeatherDashboardDisplayed.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import CityMap from "./CityMap.jsx";
import PredefinedCities from "./PredefinedCities.jsx";
import _ from "lodash";

function WeatherDashboard({ isDarkMode, toggleDarkMode }) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("");



  // List of predefined cities
  const [predefinedCities, setPredefinedCities] = useState(
    JSON.parse(localStorage.getItem("predefinedCities")) || [
      "Cairo",
      "Poland",
      "Brazil",
      "Antarctica",
    ]
  );

  // Get current location
  const location = useLocation();

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

  // Function for Updating Cities
  const updateCities = (newCity) => {
    const updatedCities = JSON.parse(
      localStorage.getItem("predefinedCities")
    ) || ["Cairo", "Poland", "Brazil", "Antarctica"];

    const formattedCity = _.capitalize(newCity);

    // Check if the city already exists in the predefined cities array
    if (!updatedCities.includes(formattedCity)) {
      // If there are already 4 cities, remove the first one
      if (updatedCities.length >= 4) {
        updatedCities.pop();
      }

      // Add the new city to the array
      updatedCities.unshift(formattedCity);

      // update array of the citties
      setPredefinedCities(updatedCities);

      // Save the updated cities list to localStorage
      localStorage.setItem("predefinedCities", JSON.stringify(updatedCities));
    }
  };

  // Handle search and fetch new weather data
  const handleSearch = async () => {
    try {
      setError("");

      const data = await getWeather(city);

      setWeatherData(data);

      saveToLocalStorage(data);

      // Call updateCities to update the predefined cities list in localStorage
      updateCities(city);

      setCity("");
    } catch (error) {
      setError(error.message);
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

  console.log(weatherData);

  return (
    <>
      {/* Show WeatherDashboardDisplayed only on the home route */}
      {location.pathname === "/home" && (
        <WeatherDashboardDisplayed
          weatherData={weatherData}
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          error={error}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Define Routes */}
      <Routes>
        <Route
          path="cities"
          element={
            <PredefinedCities
              handlePredefinedCityClick={handlePredefinedCityClick}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              city={city}
              setCity={setCity}
              handleSearch={handleSearch}
              predefinedCities={predefinedCities}
              weatherData={weatherData}
            />
          }
        />

        <Route
          path="map"
          element={
            weatherData ? (
              <CityMap
                lat={weatherData.coord.lat}
                lng={weatherData.coord.lon}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                city={city}
                setCity={setCity}
                handleSearch={handleSearch}
                predefinedCities={predefinedCities}
                handlePredefinedCityClick={handlePredefinedCityClick}
              />
            ) : (
              <div>Loading map or no data available</div>
            )
          }
        />
      </Routes>
    </>
  );
}

export default WeatherDashboard;

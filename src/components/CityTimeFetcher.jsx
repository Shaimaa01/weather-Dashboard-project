/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CurrentDateTime from "./CurrentDateTime";

const CityTimeFetcher = ({ lat, lng }) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [error, setError] = useState("");
  const intervalRef = useRef(null); // Store the interval reference

  const fetchCityTime = async () => {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=OXJ5JMN27MH5&format=json&by=position&lat=${lat}&lng=${lng}`
    )}`;

    try {
      const response = await axios.get(url);
      const responseData = JSON.parse(response.data.contents);

      if (responseData.status === "OK") {
        const formattedTime = new Date(responseData.formatted);
        setCurrentTime(formattedTime);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch time on initial mount or lat/lng change
  useEffect(() => {
    if (lat && lng) {
      fetchCityTime();
    }
  }, [lat, lng]);

  // Handle time updates every second
  useEffect(() => {
    if (currentTime) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime) {
            return new Date(prevTime.getTime() + 1000); // Increment by 1 second
          }
          return prevTime;
        });
      }, 1000);
    }

    // Cleanup on unmount or time change
    return () => clearInterval(intervalRef.current);
  }, [currentTime]);

  const formatTime = (time) => {
    const hours = time.getHours();
    const hour12 = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes}:${seconds} ${period}`;
  };

  return (
    <div>
      {error ? (
        <div>
          <CurrentDateTime />
        </div>
      ) : (
        <span>{currentTime ? formatTime(currentTime) : "Loading..."}</span>
      )}
    </div>
  );
};

export default CityTimeFetcher;





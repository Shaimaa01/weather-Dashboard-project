/* eslint-disable react/prop-types */

import daySunny from "../assets/icons/sunny.svg";
import nightClear from "../assets/icons/night.svg";
import dayCloudy from "../assets/icons/cloudy-day.svg";
import nightAltCloudy from "../assets/icons/cloudy-night.svg";
import cloudy from "../assets/icons/cloudy.svg";
import DayRain from "../assets/icons/dayRain.svg";
import nightRain from "../assets/icons/nightRain.svg";
import moreRain from "../assets/icons/moreRain.svg";
import thunderstorm from "../assets/icons/thunder.svg";
import Daysnow from "../assets/icons/daySnow.svg";
import Nightsnow from "../assets/icons/nightSnow.svg";
import fog from "../assets/icons/fog-svgrepo-com.svg";


const weatherIconMap = {
  "01d": daySunny,
  "01n": nightClear,
  "02d": dayCloudy,
  "02n": nightAltCloudy,
  "03d": cloudy,
  "03n": cloudy,
  "04d": cloudy,
  "04n": cloudy,
  "09d": DayRain,
  "09n": nightRain,
  "10d": moreRain,
  "10n": moreRain,
  "11d": thunderstorm,
  "11n": thunderstorm,
  "13d": Daysnow,
  "13n": Nightsnow,
  "50d": fog,
  "50n": fog,
};

const defaultIcon = cloudy;

const WeatherIcon = ({ iconCode }) => {
  const iconSrc = weatherIconMap[iconCode] || defaultIcon;

  return (
    <img
      src={iconSrc} 
      alt={iconCode} 
      className="w-20 h-20"
    />
  );
};

export default WeatherIcon;

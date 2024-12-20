import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Fetch 5-day/3-hour weather forecast
const getForecast = async (city) => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export { getForecast };

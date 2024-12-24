import { useEffect, useState } from "react";
import axios from "axios";

const FetchCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    } else {
      axios
        .get("https://worldtimeapi.org/api/timezone")
        .then((response) => {
          const cityNames = [
            ...new Set(
              response.data.map((entry) => {
                const parts = entry.split("/");

                return (parts[1] || parts[0]).replace(/_/g, " ");
              })
            ),
          ];
          localStorage.setItem("cities", JSON.stringify(cityNames));
          setCities(cityNames);
        })
        .catch((error) => console.error(error.message));
    }
  }, []);

  return cities.slice(0,100);
};

export default FetchCities;

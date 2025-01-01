/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import SidebarMenu from "./SidebarMenu";
import "../App.css";

const CityMap = ({
  lat,
  lng,
  isDarkMode,
  toggleDarkMode,
  city,
  setCity,
  handleSearch,
}) => {
  const [position, setPosition] = useState([lat, lng]);

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);


// styleing zoom in out 
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--leaflet-bg-color",
      isDarkMode ? "#1f2937" : "#e5e7eb"
    );
    document.documentElement.style.setProperty(
      "--leaflet-text-color",
      isDarkMode ? "#fff" : "#6b7280"
    );
    document.documentElement.style.setProperty(
      "--leaflet-border-color",
      isDarkMode ? "#ddd" : "#000"
    );
    document.documentElement.style.setProperty(
      "--leaflet-hover-bg-color",
      isDarkMode ? "#030712" : "#f8fafc"
    );
  }, [isDarkMode]);
  

  return (
    // Container
    <div
      className={` ${
        isDarkMode ? "bg-gray-950 text-slate-300" : "bg-slate-50 text-black"
      }  min-h-screen p-6 `}
    >
      {/* child container */}
      <div className=" sm:flex gap-6 justify-between  pb-10 min-h-screen max-sm:block ">
        {/* First column */}
        <SidebarMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Second colmun */}
        <div className="w-full max-h-full">
          {/* Search part  */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search for cities"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              className={` h-10 w-full focus:outline-none ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }   font-medium text-sm pl-4 rounded-xl `}
            />
            <button onClick={handleSearch}>
              <i className="fas fa-search text-sky-300 text-xl -ml-14"></i>
            </button>
          </div>

          {/* map*/}
          <div
            className="rounded-2xl m-auto mt-6 shadow-md shadow-gray-900/50  "
            style={{
              height: "calc(100vh - 100px)",
            }}
          >
            <MapContainer
              center={position}
              zoom={2}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
              className="rounded-2xl p-0 m-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;

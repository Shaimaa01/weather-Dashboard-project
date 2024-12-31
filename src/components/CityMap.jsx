/* eslint-disable react/prop-types */

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import SidebarMenu from "./SidebarMenu";

const CityMap = ({ lat, lng, isDarkMode, toggleDarkMode }) => {
  const [position, setPosition] = useState([lat, lng]);

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className=" sm:flex gap-6 justify-between  pb-6   ">
      <SidebarMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />{" "}
      <div className="h-96 w-full m-auto mt-8 shadow-md shadow-gray-900/50 ">
        <MapContainer
          center={position}
          zoom={1}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
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
  );
};

export default CityMap;

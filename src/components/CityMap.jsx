
/* eslint-disable react/prop-types */

import { MapContainer, TileLayer, Marker, Popup  } from "react-leaflet";
import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css'; 

const CityMap = ({ lat, lng }) => {
  const [position, setPosition] = useState([lat, lng]);

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className="h-96 w-4/5 m-auto my-4">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }} >
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
  );
};

export default CityMap;

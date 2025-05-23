import React, { useState, useEffect } from "react";
import { Button, Select, message } from "antd";
import { MapPinOutlined, WarningOutlined, AimOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom marker icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "current-location-marker"
});

// Component to handle map location updates
function LocationMarker({ position, setPosition }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return position ? (
    <Marker position={position} icon={currentLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

function LocationAccess({ onLocationSet }) {
  const [collegeName, setCollegeName] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // List of colleges without predefined locations
  const colleges = [
    { value: "kiet", label: "KIET Group of Institutions" },
    { value: "pes", label: "PES University" },
    { value: "rvce", label: "RV College of Engineering" },
    { value: "msrit", label: "MS Ramaiah Institute of Technology" },
    { value: "bmsce", label: "BMS College of Engineering" },
    { value: "srm", label: "SRM University" },
    { value: "christ", label: "Christ University" },
    { value: "manipal", label: "Manipal Institute of Technology" },
    { value: "vit", label: "VIT University" },
  ];

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
          setIsLoadingLocation(false);
          message.success("Location found!");
        },
        (error) => {
          console.error("Error getting location:", error);
          message.error("Could not get your location. Please try again.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      message.error("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (value) => {
    setCollegeName(value);
  };

  const handleSaveLocation = () => {
    if (!collegeName) {
      message.error("Please select your college");
      return;
    }
    if (!currentLocation) {
      message.error("Please get your current location first");
      return;
    }

    localStorage.setItem("userLocation", currentLocation.join(","));
    localStorage.setItem("userCollege", collegeName);
    message.success("Location saved successfully!");
    onLocationSet();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Restore</h1>
          <p className="text-gray-600">Please set your location to get started</p>
        </div>

        <div className="glass-effect p-8 rounded-xl">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your College
              </label>
              <Select
                placeholder="Choose your college"
                className="w-full"
                value={collegeName}
                onChange={handleLocationSelect}
                options={colleges}
                size="large"
              />
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden border relative">
              {currentLocation && (
                <MapContainer
                  center={currentLocation}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker position={currentLocation} setPosition={setCurrentLocation} />
                </MapContainer>
              )}
              <Button
                type="primary"
                icon={<AimOutlined />}
                onClick={getCurrentLocation}
                loading={isLoadingLocation}
                className="absolute bottom-4 right-4 z-[1000]"
              >
                My Location
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                type="primary"
                size="large"
                onClick={handleSaveLocation}
                className="primary-button px-8"
              >
                Continue
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Select your college from the dropdown above and click the location button to set your current location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationAccess; 
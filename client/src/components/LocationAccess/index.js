import React, { useState, useEffect } from "react";
import { Button, Select, message } from "antd";
import { MapPinOutlined, WarningOutlined } from "@ant-design/icons";

function LocationAccess({ onLocationSet }) {
  const [collegeName, setCollegeName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // List of popular colleges
  const colleges = [
    { value: "kiet", label: "KIET Group of Institutions", location: "28.6448,77.4931" },
    { value: "pes", label: "PES University", location: "12.9716,77.5946" },
    { value: "rvce", label: "RV College of Engineering", location: "12.9716,77.5946" },
    { value: "msrit", label: "MS Ramaiah Institute of Technology", location: "12.9716,77.5946" },
    { value: "bmsce", label: "BMS College of Engineering", location: "12.9716,77.5946" },
    { value: "srm", label: "SRM University", location: "12.9716,77.5946" },
    { value: "christ", label: "Christ University", location: "12.9716,77.5946" },
    { value: "manipal", label: "Manipal Institute of Technology", location: "12.9716,77.5946" },
    { value: "vit", label: "VIT University", location: "12.9716,77.5946" },
  ];

  const handleLocationSelect = (value) => {
    setCollegeName(value);
    const selectedCollege = colleges.find(c => c.value === value);
    if (selectedCollege) {
      setSelectedLocation(selectedCollege.location);
    }
  };

  const handleSaveLocation = () => {
    if (!collegeName) {
      message.error("Please select your college");
      return;
    }
    if (!selectedLocation) {
      message.error("Please select a location");
      return;
    }

    localStorage.setItem("userLocation", selectedLocation);
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

            <div className="h-[400px] rounded-lg overflow-hidden border">
              {selectedLocation && (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedLocation}&zoom=15`}
                  allowFullScreen
                />
              )}
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
              Select your college from the dropdown above. The map will show the
              location of your college.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationAccess; 
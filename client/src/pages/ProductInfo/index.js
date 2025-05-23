import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import Divider from "../../components/Divider";

// Mock PG data - same as in Home page
const mockPGs = [
  {
    _id: "pg1",
    name: "Sunrise PG for Girls",
    price: 8000,
    location: "Koramangala, Bangalore",
    distance: "1.2 km",
    rating: 4.8,
    amenities: ["WiFi", "Laundry", "Food", "Security"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Modern PG with all amenities near tech parks"
  },
  {
    _id: "pg2",
    name: "Green Valley PG",
    price: 7500,
    location: "HSR Layout, Bangalore",
    distance: "2.5 km",
    rating: 4.5,
    amenities: ["WiFi", "Laundry", "Food", "Gym"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Peaceful PG with garden view and modern facilities"
  },
  {
    _id: "pg3",
    name: "Royal PG for Boys",
    price: 9000,
    location: "Whitefield, Bangalore",
    distance: "3.1 km",
    rating: 4.7,
    amenities: ["WiFi", "Laundry", "Food", "TV Room"],
    images: ["https://images.unsplash.com/photo-1560449017-3e7fa6980f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Premium PG with spacious rooms and study area"
  },
  {
    _id: "pg4",
    name: "Comfort PG",
    price: 7000,
    location: "Marathahalli, Bangalore",
    distance: "1.8 km",
    rating: 4.3,
    amenities: ["WiFi", "Laundry", "Food"],
    images: ["https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Affordable PG with basic amenities"
  },
  {
    _id: "pg5",
    name: "Elite PG",
    price: 10000,
    location: "Electronic City, Bangalore",
    distance: "4.2 km",
    rating: 4.9,
    amenities: ["WiFi", "Laundry", "Food", "Gym", "TV Room"],
    images: ["https://images.unsplash.com/photo-1560449017-3e7fa6980f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Luxury PG with premium amenities and services"
  },
  {
    _id: "pg6",
    name: "Student PG",
    price: 6500,
    location: "Bannerghatta, Bangalore",
    distance: "2.7 km",
    rating: 4.2,
    amenities: ["WiFi", "Laundry", "Food", "Study Room"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Student-friendly PG with study environment"
  }
];

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the PG data based on ID
  const pg = mockPGs.find(pg => pg._id === id);

  if (!pg) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">PG Not Found</h2>
          <Button 
            type="primary" 
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Images */}
            <div className="md:w-1/2 p-6">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <img
                  src={pg.images[0]}
                  className="w-full h-full object-cover"
                  alt={pg.name}
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:w-1/2 p-6">
              <div className="space-y-6">
                {/* Title and Description */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {pg.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {pg.description}
                  </p>
                </div>

                <Divider />

                {/* Key Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    PG Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Monthly Rent</p>
                      <p className="text-xl font-semibold text-gray-900">₹{pg.price}/month</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-xl font-semibold text-gray-900">{pg.location}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="text-xl font-semibold text-gray-900">{pg.distance}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="text-xl font-semibold text-gray-900">{pg.rating}/5</p>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Amenities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {pg.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="pt-6">
                  <Button 
                    type="primary" 
                    size="large"
                    block
                    className="h-12 text-lg"
                  >
                    Contact Owner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
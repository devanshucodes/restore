import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Avatar, InputNumber } from "antd";
import { SendOutlined, UserOutlined, DollarOutlined, ArrowLeftOutlined, StarFilled } from '@ant-design/icons';
import Divider from "../../components/Divider";

// Mock PG data with real images
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

// Mock chat messages
const mockChatMessages = [
  {
    id: 1,
    sender: "buyer",
    message: "Hi, I'm interested in this PG. Is it still available?",
    timestamp: "10:30 AM",
    bid: null
  }
];

function ProductInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState(null);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);

  // Get the PG data based on ID
  const pg = mockPGs.find(p => p._id === id);

  const handleSendMessage = () => {
    if (message.trim() === "" && !bidAmount) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "buyer",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bid: bidAmount
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
    setBidAmount(null);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Images */}
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src={pg.images[0]}
                  className="w-full h-[500px] object-cover"
                  alt={pg.name}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <StarFilled />
                    {pg.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:w-1/2 p-8">
              <div className="space-y-6">
                {/* Title and Description */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {pg.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {pg.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {pg.distance}
                    </span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    {pg.description}
                  </p>
                </div>

                <Divider />

                {/* Price */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Rent</p>
                      <p className="text-3xl font-bold text-gray-900">₹{pg.price}</p>
                    </div>
                    <Button 
                      type="primary" 
                      size="large"
                      className="h-12 px-8 text-lg"
                      onClick={() => setShowChat(true)}
                    >
                      Contact Owner
                    </Button>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {pg.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        <span className="text-blue-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          {showChat && (
            <div className="border-t border-gray-200">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chat with Owner</h2>
                
                {/* Chat Messages */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto px-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 ${
                          msg.sender === 'buyer'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar
                            icon={<UserOutlined />}
                            className={msg.sender === 'buyer' ? 'bg-blue-600' : 'bg-gray-400'}
                          />
                          <span className="text-sm font-medium">
                            {msg.sender === 'buyer' ? 'You' : 'Owner'}
                          </span>
                        </div>
                        <p className="text-lg">{msg.message}</p>
                        {msg.bid && (
                          <div className="mt-3 p-3 bg-white bg-opacity-20 rounded-xl">
                            <div className="flex items-center gap-2">
                              <DollarOutlined className="text-lg" />
                              <span className="font-semibold text-lg">Bid: ₹{msg.bid}/month</span>
                            </div>
                          </div>
                        )}
                        <span className="text-xs opacity-75 mt-2 block">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input with Bid */}
                <div className="space-y-4 px-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onPressEnter={handleSendMessage}
                      className="flex-1 h-12 text-lg"
                    />
                    <InputNumber
                      prefix="₹"
                      placeholder="Monthly rent"
                      value={bidAmount}
                      onChange={setBidAmount}
                      min={1}
                      max={pg.price * 2}
                      className="w-48 h-12 text-lg"
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      className="h-12 px-6 text-lg"
                    >
                      Send
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Original Monthly Rent: ₹{pg.price}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Avatar, InputNumber } from "antd";
import { SendOutlined, UserOutlined, DollarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Divider from "../../components/Divider";

// Mock Products data - same as in Home page
const mockProducts = [
  {
    _id: "1",
    name: "Modern Gaming Laptop",
    price: 999,
    age: 2,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "High-performance gaming laptop with RTX graphics",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  },
  {
    _id: "2",
    name: "Ergonomic Office Chair",
    price: 1499,
    age: 1,
    category: "furniture",
    images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Comfortable office chair with lumbar support",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  },
  {
    _id: "3",
    name: "Designer Watch",
    price: 799,
    age: 3,
    category: "fashion",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Elegant designer watch with leather strap",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  },
  {
    _id: "4",
    name: "Wireless Headphones",
    price: 299,
    age: 1,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Premium noise-cancelling wireless headphones",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  },
  {
    _id: "5",
    name: "Modern Sofa",
    price: 2499,
    age: 2,
    category: "furniture",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Contemporary 3-seater sofa with premium fabric",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  },
  {
    _id: "6",
    name: "Smart Watch",
    price: 399,
    age: 1,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    description: "Feature-rich smartwatch with health tracking",
    status: "Available",
    billAvailable: true,
    warrantyAvailable: true,
    accessoriesAvailable: true,
    boxAvailable: true
  }
];

// Mock chat messages
const mockChatMessages = [
  {
    id: 1,
    sender: "buyer",
    message: "Hi, I'm interested in this product. Is it still available?",
    timestamp: "10:30 AM",
    bid: null
  }
];

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState(null);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);

  // Get the product data based on ID
  const product = mockProducts.find(p => p._id === id);

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

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
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
                  src={product.images[0]}
                  className="w-full h-[500px] object-cover"
                  alt={product.name}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-gray-700 font-medium">
                    {product.age} {product.age === 1 ? 'year' : 'years'} old
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
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {product.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    {product.description}
                  </p>
                </div>

                <Divider />

                {/* Price */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                    </div>
                    <Button 
                      type="primary" 
                      size="large"
                      className="h-12 px-8 text-lg"
                      onClick={() => setShowChat(true)}
                    >
                      Contact Seller
                    </Button>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Bill Available: {product.billAvailable ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Warranty: {product.warrantyAvailable ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Accessories: {product.accessoriesAvailable ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Box Available: {product.boxAvailable ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          {showChat && (
            <div className="border-t border-gray-200">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chat with Seller</h2>
                
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
                            {msg.sender === 'buyer' ? 'You' : 'Seller'}
                          </span>
                        </div>
                        <p className="text-lg">{msg.message}</p>
                        {msg.bid && (
                          <div className="mt-3 p-3 bg-white bg-opacity-20 rounded-xl">
                            <div className="flex items-center gap-2">
                              <DollarOutlined className="text-lg" />
                              <span className="font-semibold text-lg">Bid: ₹{msg.bid}</span>
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
                      placeholder="Bid amount"
                      value={bidAmount}
                      onChange={setBidAmount}
                      min={1}
                      max={product.price * 2}
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
                    Original Price: ₹{product.price}
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

export default ProductDetails; 
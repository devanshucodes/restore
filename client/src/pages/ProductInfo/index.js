import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, message, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import Divider from "../../components/Divider";
import { SendOutlined } from '@ant-design/icons';

// Mock products data
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
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
    boxAvailable: true,
    seller: {
      name: "Restore Store",
      email: "store@restore.com"
    }
  }
];

// Mock PG data
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
  // ... other mock PGs
];

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [isPG, setIsPG] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      console.log("ProductInfo: Starting to fetch data for ID:", id);
      
      // First try to get the current product from localStorage
      const currentProduct = localStorage.getItem('currentProduct');
      if (currentProduct) {
        try {
          const productData = JSON.parse(currentProduct);
          console.log("ProductInfo: Found current product:", productData);
          
          // Check if it's a PG
          if (productData.type === 'pg' || productData._id?.startsWith('pg')) {
            setIsPG(true);
            const pgWithDefaults = {
              ...productData,
              _id: productData._id || productData.id || id,
              name: productData.name || "PG",
              price: productData.price || 0,
              location: productData.location || "Location not specified",
              distance: productData.distance || "Distance not specified",
              rating: productData.rating || 0,
              amenities: productData.amenities || [],
              images: productData.images || [productData.image] || ["https://via.placeholder.com/600"],
              description: productData.description || "No description available"
            };
            console.log("ProductInfo: Setting PG with defaults:", pgWithDefaults);
            setProduct(pgWithDefaults);
            return;
          }
          
          // Regular product
          setIsPG(false);
          const productWithDefaults = {
            ...productData,
            _id: productData._id || productData.id || id,
            name: productData.name || "Product",
            price: productData.price || 0,
            age: productData.age || 0,
            category: productData.category || "other",
            images: productData.images || [productData.image] || ["https://via.placeholder.com/600"],
            description: productData.description || "No description available",
            status: productData.status || "Available",
            billAvailable: productData.billAvailable || false,
            warrantyAvailable: productData.warrantyAvailable || false,
            accessoriesAvailable: productData.accessoriesAvailable || false,
            boxAvailable: productData.boxAvailable || false,
            seller: productData.seller || {
              name: productData.name || "Seller",
              email: productData.email || "seller@example.com"
            }
          };
          console.log("ProductInfo: Setting product with defaults:", productWithDefaults);
          setProduct(productWithDefaults);
          return;
        } catch (error) {
          console.error("ProductInfo: Error parsing current product:", error);
        }
      }
      
      // If no current product, try to find in mock data
      const foundPG = mockPGs.find(p => String(p._id) === String(id));
      if (foundPG) {
        setIsPG(true);
        setProduct(foundPG);
        return;
      }
      
      const foundProduct = mockProducts.find(p => String(p._id) === String(id));
      if (foundProduct) {
        setIsPG(false);
        setProduct(foundProduct);
      } else {
        console.log("ProductInfo: Product not found");
        message.error("Product not found");
        navigate("/");
      }
    } catch (error) {
      console.error("ProductInfo: Error in getData:", error);
      message.error(error.message);
    } finally {
      dispatch(SetLoader(false));
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  const handleContactClick = () => {
    setShowChat(true);
    // Auto-send first message
    const initialMessage = {
      id: Date.now(),
      sender: "You",
      content: isPG 
        ? "Hi, I'm interested in your PG. Can you tell me more about it?"
        : "Hi, I'm interested in this product. Can you tell me more about it?",
      timestamp: new Date().toISOString(),
    };
    setChatMessages([initialMessage]);
  };

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      message.error("Please enter a valid bid amount");
      return;
    }

    const bidMessage = {
      id: Date.now(),
      sender: "You",
      content: `I would like to offer ₹${bidAmount} for this ${isPG ? 'PG' : 'product'}.`,
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, bidMessage]);
    setShowBidInput(false);
    setBidAmount("");
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!product) {
    return null;
  }

  if (isPG) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="glass-effect p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PG Images */}
            <div className="space-y-4">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* PG Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary mt-2">
                  ₹ {product.price}/month
                </p>
              </div>

              <Divider />

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Description</h2>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Details</h2>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{product.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-medium">{product.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <p className="font-medium">{product.rating}/5</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Amenities</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.amenities?.map((amenity, index) => (
                      <span key={index} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Divider />

              <div className="flex gap-4">
                <Button 
                  type="primary" 
                  size="large" 
                  className="primary-button"
                  onClick={handleContactClick}
                >
                  Contact Owner
                </Button>
                <Button size="large" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <div className="glass-effect p-6 rounded-xl mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat with PG Owner</h2>
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "You"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">{msg.sender}</p>
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {showBidInput ? (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      prefix="₹"
                      className="flex-1"
                    />
                    <Button
                      type="primary"
                      onClick={handleBidSubmit}
                      className="primary-button"
                    >
                      Submit Bid
                    </Button>
                    <Button onClick={() => setShowBidInput(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onPressEnter={handleSendMessage}
                      className="flex-1"
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      className="primary-button"
                    >
                      Send
                    </Button>
                    <Button onClick={() => setShowBidInput(true)}>
                      Make an Offer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="glass-effect p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/600"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary mt-2">
                ₹ {product.price}
              </p>
            </div>

            <Divider />

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Description</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Details</h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-gray-600">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium">{product.age} {product.age === 1 ? "year" : "years"}</p>
                  </div>
                </div>
              </div>

              {product.seller && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Seller Information</h2>
                  <div className="mt-2">
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">{product.seller.name}</p>
                    <p className="text-gray-600 mt-2">Email</p>
                    <p className="font-medium">{product.seller.email}</p>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Availability</h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-gray-600">Bill Available</p>
                    <p className="font-medium">{product.billAvailable ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Warranty Available</p>
                    <p className="font-medium">{product.warrantyAvailable ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Accessories Available</p>
                    <p className="font-medium">{product.accessoriesAvailable ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Box Available</p>
                    <p className="font-medium">{product.boxAvailable ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            <div className="flex gap-4">
              <Button type="primary" size="large" className="primary-button">
                Contact Seller
              </Button>
              <Button size="large" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
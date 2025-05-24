import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, message as antMessage, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import Divider from "../../components/Divider";
import { SendOutlined, CheckCircleFilled, DollarCircleFilled, ShopFilled } from '@ant-design/icons';

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
  const [showPayment, setShowPayment] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [userUPI, setUserUPI] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = antMessage.useMessage();
  const chatContainerRef = useRef(null);
  const [pendingMessage, setPendingMessage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [upiUrl, setUpiUrl] = useState('');

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
        antMessage.error("Product not found");
        navigate("/");
      }
    } catch (error) {
      console.error("ProductInfo: Error in getData:", error);
      antMessage.error(error.message);
    } finally {
      dispatch(SetLoader(false));
    }
  };

  // Handle error messages in useEffect
  useEffect(() => {
    if (error) {
      setPendingMessage(error);
      setError(null);
    }
  }, [error]);

  // Handle pending messages in useEffect
  useEffect(() => {
    if (pendingMessage) {
      messageApi.error({
        content: pendingMessage,
        duration: 5,
        key: 'message'
      });
      setPendingMessage(null);
    }
  }, [pendingMessage, messageApi]);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const showMessage = (content) => {
    setPendingMessage(content);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      showMessage("Message cannot be empty");
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "You",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      showMessage("Please enter a valid bid amount");
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

  const createPaymentQR = async () => {
    try {
      setLoading(true);
      const serverUrl = 'http://localhost:4000';
      const response = await fetch(`${serverUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount: product.price
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('QR code generation failed:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to generate QR code');
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setUpiUrl(data.upiUrl);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      let errorMessage = 'Failed to generate QR code. ';
      
      if (error.message === 'Failed to fetch') {
        errorMessage += 'Please make sure the server is running at http://localhost:4000';
      } else {
        errorMessage += error.message;
      }
      
      setError(errorMessage);
      setShowPaymentModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    // Add payment confirmation message to chat with enhanced visuals
    const paymentMessage = {
      id: Date.now(),
      sender: "You",
      content: (
        <div className="bg-white rounded-lg p-4 shadow-md text-black">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircleFilled className="text-green-500 text-2xl animate-bounce" />
            <span className="text-lg font-semibold text-green-600">Payment Completed</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarCircleFilled className="text-blue-500" />
              <span className="font-medium text-gray-800">Amount: ₹{isPG ? product.price : product.price}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShopFilled className="text-purple-500" />
              <span className="font-medium text-gray-800">Product: {product.name}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-700">Please confirm the receipt of payment.</p>
          </div>
        </div>
      ),
      timestamp: new Date().toISOString(),
    };
    setChatMessages(prev => [...prev, paymentMessage]);
    setShowPaymentModal(false);
    
    // Show success message with animation
    messageApi.success({
      content: (
        <div className="flex items-center space-x-2">
          <CheckCircleFilled className="text-green-500 text-xl" />
          <span>Payment confirmation sent to chat</span>
        </div>
      ),
      duration: 3,
    });
  };

  const handleOpenUPI = () => {
    try {
      // Create a more compatible UPI URL
      const upiParams = {
        pa: '7404313376@ybl', // Payee address
        pn: 'Restore', // Payee name
        am: product.price.toString(), // Amount
        cu: 'INR', // Currency
        tn: `Payment for ${product.name}`, // Transaction note
      };

      // Convert params to URL string with proper encoding
      const upiUrl = `upi://pay?${Object.entries(upiParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')}`;

      // Try to open in UPI app
      window.location.href = upiUrl;
      
      // Fallback for mobile devices
      setTimeout(() => {
        // If the UPI app doesn't open, show instructions
        messageApi.info({
          content: (
            <div className="text-sm">
              <p>If UPI app didn't open automatically:</p>
              <ol className="list-decimal pl-4 mt-1">
                <li>Copy this UPI ID: 7404313376@ybl</li>
                <li>Open your UPI app manually (Google Pay, PhonePe, Paytm, etc.)</li>
                <li>Enter the amount: ₹{product.price}</li>
                <li>Add a note: Payment for {product.name}</li>
              </ol>
            </div>
          ),
          duration: 10,
        });
      }, 1000);
    } catch (error) {
      console.error('Error opening UPI app:', error);
      messageApi.error('Failed to open UPI app. Please try scanning the QR code instead.');
    }
  };

  // Replace the handlePayment function with createPaymentQR
  const handlePayment = createPaymentQR;

  // Update the chat message rendering to handle React elements
  const renderChatMessage = (msg) => (
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
            : msg.sender === "System"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium">{msg.sender}</p>
          {msg.sender === "You" && <CheckCircleFilled className="text-green-300 text-sm" />}
        </div>
        <div className="message-content">{msg.content}</div>
        <p className="text-xs mt-2 opacity-70">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  // Add some CSS for animations
  const styles = `
    @keyframes slideIn {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .message-content {
      animation: slideIn 0.3s ease-out;
    }
    
    .animate-bounce {
      animation: bounce 1s infinite;
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `;

  // Update the payment modal to include better instructions
  const renderPaymentModal = () => (
    <Modal
      title="Scan QR Code to Pay with UPI"
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      footer={[
        <Button key="cancel" onClick={() => setShowPaymentModal(false)}>
          Cancel
        </Button>,
        <Button 
          key="done" 
          type="primary" 
          onClick={handlePaymentComplete}
          className="primary-button bg-green-600 hover:bg-green-700"
        >
          I've Paid
        </Button>
      ]}
    >
      <div className="flex flex-col items-center space-y-4">
        <img src={qrCode} alt="UPI Payment QR Code" className="w-64 h-64" />
        <p className="text-gray-600 text-lg font-semibold">Amount: ₹{product.price}</p>
        <p className="text-sm text-gray-500">Scan this QR code with any UPI app to pay</p>
        <div className="flex flex-col items-center space-y-2">
          <Button 
            type="primary"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleOpenUPI}
          >
            Open in UPI App
          </Button>
          <div className="text-center">
            <p className="text-xs text-gray-500">UPI ID: 7404313376@ybl</p>
            <p className="text-xs text-gray-500 mt-1">Supported Apps: Google Pay, PhonePe, Paytm, etc.</p>
          </div>
        </div>
      </div>
    </Modal>
  );

  // Update the payment button in the product info section
  const renderPaymentButton = () => (
    <Button 
      type="primary" 
      size="large" 
      className="primary-button bg-green-600 hover:bg-green-700"
      onClick={createPaymentQR}
      loading={loading}
    >
      Pay with UPI
    </Button>
  );

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
                {renderPaymentButton()}
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
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4"
              >
                {chatMessages.map(renderChatMessage)}
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

        {/* UPI Modal */}
        <Modal
          title="Enter UPI ID"
          open={showUPIModal}
          onCancel={() => setShowUPIModal(false)}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Please enter your UPI ID. You will be redirected to a secure payment page where you can pay using your card.
            </p>
            <Input
              placeholder="Enter your UPI ID (e.g., name@upi)"
              value={userUPI}
              onChange={(e) => setUserUPI(e.target.value)}
              onPressEnter={() => {
                if (!userUPI || !userUPI.includes('@')) {
                  messageApi.error("Please enter a valid UPI ID");
                  return;
                }
                setShowUPIModal(false);
                handlePayment();
              }}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowUPIModal(false)}>Cancel</Button>
              <Button 
                type="primary" 
                onClick={() => {
                  if (!userUPI || !userUPI.includes('@')) {
                    messageApi.error("Please enter a valid UPI ID");
                    return;
                  }
                  setShowUPIModal(false);
                  handlePayment();
                }}
                loading={loading}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </Modal>

        {/* Verification Modal */}
        <Modal
          title="Processing Payment Request"
          open={showVerification}
          footer={null}
          closable={false}
          maskClosable={false}
          destroyOnClose
        >
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Creating payment request...</p>
          </div>
        </Modal>

        {renderPaymentModal()}
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      {contextHolder}
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
                <Button 
                  type="primary" 
                  size="large" 
                  className="primary-button"
                  onClick={handleContactClick}
                >
                  Contact Seller
                </Button>
                {renderPaymentButton()}
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat with Seller</h2>
            <div className="flex flex-col h-[400px]">
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4"
              >
                {chatMessages.map(renderChatMessage)}
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

        {/* Payment Modal */}
        {renderPaymentModal()}
      </div>
    </>
  );
}

export default ProductInfo;
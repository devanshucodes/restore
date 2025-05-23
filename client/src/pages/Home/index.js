import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Input, Avatar, List, Tag, Tooltip } from "antd";
import { UserOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import Divider from "../../components/Divider";
import Filters from "./Filters";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  // Mock products data with real images
  const mockProducts = [
    {
      _id: "1",
      name: "Modern Gaming Laptop",
      price: 999,
      age: 2,
      category: "electronics",
      images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "High-performance gaming laptop with RTX graphics"
    },
    {
      _id: "2",
      name: "Ergonomic Office Chair",
      price: 1499,
      age: 1,
      category: "furniture",
      images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "Comfortable office chair with lumbar support"
    },
    {
      _id: "3",
      name: "Designer Watch",
      price: 799,
      age: 3,
      category: "fashion",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "Elegant designer watch with leather strap"
    },
    {
      _id: "4",
      name: "Wireless Headphones",
      price: 299,
      age: 1,
      category: "electronics",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "Premium noise-cancelling wireless headphones"
    },
    {
      _id: "5",
      name: "Modern Sofa",
      price: 2499,
      age: 2,
      category: "furniture",
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "Contemporary 3-seater sofa with premium fabric"
    },
    {
      _id: "6",
      name: "Smart Watch",
      price: 399,
      age: 1,
      category: "electronics",
      images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
      description: "Feature-rich smartwatch with health tracking"
    }
  ];

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
      images: ["https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
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
      images: ["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
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

  // Mock community messages
  const mockMessages = [
    {
      id: 1,
      user: {
        name: "Rahul Sharma",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: "Looking for a roommate in Koramangala area. Anyone interested?",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      tags: ["Roommate", "Koramangala"]
    },
    {
      id: 2,
      user: {
        name: "Priya Patel",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      content: "Just moved to HSR Layout. Any good PGs or apartments recommendations?",
      timestamp: "5 hours ago",
      likes: 8,
      comments: 12,
      tags: ["HSR Layout", "Recommendations"]
    },
    {
      id: 3,
      user: {
        name: "Amit Kumar",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      content: "Selling my study table and chair. DM if interested!",
      timestamp: "1 day ago",
      likes: 5,
      comments: 3,
      tags: ["Furniture", "For Sale"]
    },
    {
      id: 4,
      user: {
        name: "Neha Gupta",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
      },
      content: "Anyone know a good laundry service in Whitefield?",
      timestamp: "2 days ago",
      likes: 15,
      comments: 7,
      tags: ["Services", "Whitefield"]
    },
    {
      id: 5,
      user: {
        name: "Vikram Singh",
        avatar: "https://randomuser.me/api/portraits/men/91.jpg"
      },
      content: "Looking for a study group for upcoming tech interviews. Anyone interested?",
      timestamp: "3 days ago",
      likes: 23,
      comments: 18,
      tags: ["Study Group", "Tech Interviews"]
    }
  ];

  const handlePostMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, this would send the message to a backend
    console.log("New message posted:", newMessage);
    setNewMessage("");
  };

  const items = [
    {
      key: '1',
      label: 'Products',
      children: (
        <div className="grid gap-6 grid-cols-3">
          {mockProducts.map((product) => {
            return (
              <div
                className="modern-card card-hover group cursor-pointer"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="product-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="category-badge">
                    {product.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h1 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {product.age} {product.age === 1 ? " year" : " years"} old
                  </p>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <span className="price-tag">
                      ₹ {product.price}
                    </span>
                    <Button type="primary" size="small" className="primary-button">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '2',
      label: 'PGs Near Me',
      children: (
        <div className="grid gap-6 grid-cols-3">
          {mockPGs.map((pg) => {
            return (
              <div
                className="modern-card card-hover group cursor-pointer"
                key={pg._id}
                onClick={() => navigate(`/pg/${pg._id}`)}
              >
                <div className="product-image-container">
                  <img
                    src={pg.images[0]}
                    alt={pg.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="category-badge">
                    {pg.distance} away
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h1 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {pg.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {pg.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pg.amenities.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="price-tag">
                        ₹ {pg.price}/month
                      </span>
                      <span className="text-sm text-gray-500">
                        Rating: {pg.rating}/5
                      </span>
                    </div>
                    <Button type="primary" size="small" className="primary-button">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Community',
      children: (
        <div className="flex flex-col gap-6">
          <div className="glass-effect p-4 rounded-xl">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Share with the Community</h2>
              <div className="flex gap-3">
                <Input.TextArea
                  placeholder="What's on your mind? Share your thoughts, questions, or recommendations..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="rounded-xl"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  className="primary-button"
                  onClick={handlePostMessage}
                  disabled={newMessage.trim() === ""}
                >
                  Post Message
                </Button>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Community Messages</h2>
            <List
              itemLayout="vertical"
              dataSource={mockMessages}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Tooltip title="Like">
                      <span>
                        <LikeOutlined /> {item.likes}
                      </span>
                    </Tooltip>,
                    <Tooltip title="Comment">
                      <span>
                        <MessageOutlined /> {item.comments}
                      </span>
                    </Tooltip>,
                    <Tooltip title="Share">
                      <span>
                        <ShareAltOutlined />
                      </span>
                    </Tooltip>,
                  ]}
                  extra={
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag, index) => (
                        <Tag key={index} color="blue" className="rounded-full">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.user.avatar} icon={<UserOutlined />} />}
                    title={<a href="#" className="text-primary font-medium">{item.user.name}</a>}
                    description={<span className="text-gray-500 text-xs">{item.timestamp}</span>}
                  />
                  <div className="text-gray-700 mt-2">{item.content}</div>
                </List.Item>
              )}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-6 w-full">
        <div className="glass-effect p-4 rounded-xl">
          <div className="flex gap-4 items-center">
            {!showFilters && (
              <i
                className="ri-equalizer-line text-xl cursor-pointer text-primary hover:text-primary/80 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              ></i>
            )}
            <input
              type="text"
              placeholder="Search Products, PGs, or community messages..."
              className="search-input w-full"
            />
          </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} className="w-full" />
      </div>
    </div>
  );
}

export default Home;
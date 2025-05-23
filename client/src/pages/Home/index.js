import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Input, Avatar, List, Tag, Tooltip, Modal } from "antd";
import { UserOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import Divider from "../../components/Divider";
import Filters from "./Filters";
import LocationAccess from "../../components/LocationAccess";

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
    comments: [],
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
    comments: [],
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
    comments: [],
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
    comments: [],
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
    comments: [],
    tags: ["Study Group", "Tech Interviews"]
  }
];

function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
    priceRange: [0, 10000],
    amenities: [],
    rating: 0
  });
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [communityMessage, setCommunityMessage] = useState("");
  const [communityMessages, setCommunityMessages] = useState(() => {
    const savedMessages = localStorage.getItem('communityMessages');
    return savedMessages ? JSON.parse(savedMessages) : mockMessages;
  });
  const [commentText, setCommentText] = useState("");
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [rating, setRating] = useState(0);
  const [hasLocationAccess, setHasLocationAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if location access is granted
    const checkLocationAccess = () => {
      const savedLocation = localStorage.getItem("userLocation");
      const savedCollege = localStorage.getItem("userCollege");
      
      if (savedLocation && savedCollege) {
        setHasLocationAccess(true);
      }
    };

    checkLocationAccess();
  }, []);

  const handleLocationSet = () => {
    setHasLocationAccess(true);
  };

  // Filter products based on selected filters and search query
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.category.length === 0 || 
        filters.category.includes(product.category);

      // Age filter
      const matchesAge = filters.age.length === 0 || 
        filters.age.includes(product.age.toString());

      // Price range filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesAge && matchesPrice;
    });
  }, [mockProducts, filters, searchQuery]);

  // Filter PGs based on selected filters and search query
  const filteredPGs = useMemo(() => {
    return mockPGs.filter(pg => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        pg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Amenities filter
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => pg.amenities.includes(amenity));

      // Price range filter
      const matchesPrice = pg.price >= filters.priceRange[0] && 
        pg.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = pg.rating >= filters.rating;

      return matchesSearch && matchesAmenities && matchesPrice && matchesRating;
    });
  }, [mockPGs, filters, searchQuery]);

  // Filter community messages based on search query
  const filteredMessages = useMemo(() => {
    return communityMessages.filter(message => {
      return searchQuery === "" || 
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (message.tags && message.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    });
  }, [communityMessages, searchQuery]);

  const handlePostMessage = () => {
    if (!communityMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      content: communityMessage,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: []
    };

    const updatedMessages = [newMessage, ...communityMessages];
    setCommunityMessages(updatedMessages);
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
    setCommunityMessage("");
  };

  const handleLikeMessage = (messageId) => {
    const updatedMessages = communityMessages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, likes: msg.likes + 1 };
      }
      return msg;
    });
    setCommunityMessages(updatedMessages);
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      content: commentText,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = communityMessages.map(msg => {
      if (msg.id === postId) {
        return {
          ...msg,
          comments: Array.isArray(msg.comments) ? [...msg.comments, newComment] : [newComment]
        };
      }
      return msg;
    });

    setCommunityMessages(updatedMessages);
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
    setCommentText("");
  };

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleDeletePost = (postId) => {
    Modal.confirm({
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: () => {
        const updatedMessages = communityMessages.filter(msg => msg.id !== postId);
        setCommunityMessages(updatedMessages);
        localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
      }
    });
  };

  const handleDeleteComment = (postId, commentId) => {
    Modal.confirm({
      title: 'Delete Comment',
      content: 'Are you sure you want to delete this comment?',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: () => {
        const updatedMessages = communityMessages.map(msg => {
          if (msg.id === postId) {
            return {
              ...msg,
              comments: msg.comments.filter(comment => comment.id !== commentId)
            };
          }
          return msg;
        });
        setCommunityMessages(updatedMessages);
        localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
      }
    });
  };

  const items = [
    {
      key: '1',
      label: 'Products',
      children: (
        <div className="grid gap-6 grid-cols-3">
          {filteredProducts.map((product) => {
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
          {filteredProducts.length === 0 && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No products found matching your filters</p>
            </div>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: 'PGs Near Me',
      children: (
        <div className="grid gap-6 grid-cols-3">
          {filteredPGs.map((pg) => {
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
          {filteredPGs.length === 0 && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No PGs found matching your filters</p>
            </div>
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Community',
      children: (
        <div className="flex flex-col gap-6">
          <div className="glass-effect p-6 rounded-xl">
            <h1 className="text-xl font-semibold text-primary mb-4">Community</h1>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Share something with the community..."
                value={communityMessage}
                onChange={(e) => setCommunityMessage(e.target.value)}
                onPressEnter={handlePostMessage}
                className="flex-1"
              />
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                onClick={handlePostMessage}
              >
                Post
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {filteredMessages.map((message) => {
                return (
                  <div key={message.id} className="glass-effect p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={message.user.avatar}
                          alt={message.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h1 className="font-medium text-gray-800">{message.user.name}</h1>
                          <p className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {message.user.name === "You" && (
                        <button
                          className="text-gray-500 hover:text-red-500 transition-colors p-2"
                          onClick={() => handleDeletePost(message.id)}
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{message.content}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <button
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                        onClick={() => handleLikeMessage(message.id)}
                      >
                        <i className="ri-heart-line text-lg"></i>
                        <span>{message.likes}</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                        onClick={() => toggleComments(message.id)}
                      >
                        <i className="ri-chat-1-line text-lg"></i>
                        <span>{Array.isArray(message.comments) ? message.comments.length : 0}</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {expandedPostId === message.id && (
                      <div className="mt-4 border-t pt-4">
                        <div className="flex gap-3 mb-4">
                          <Input
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onPressEnter={() => handleAddComment(message.id)}
                            className="flex-1"
                          />
                          <button
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            onClick={() => handleAddComment(message.id)}
                          >
                            Comment
                          </button>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {Array.isArray(message.comments) && message.comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <span className="font-medium text-sm text-gray-800">
                                    {comment.user.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                {comment.user.name === "You" && (
                                  <button
                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                    onClick={() => handleDeleteComment(message.id, comment.id)}
                                  >
                                    <i className="ri-delete-bin-line text-sm"></i>
                                  </button>
                                )}
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (!hasLocationAccess) {
    return <LocationAccess onLocationSet={handleLocationSet} />;
  }

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} className="w-full" />
      </div>
    </div>
  );
}

export default Home;
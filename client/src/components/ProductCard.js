import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Ensure we have a valid ID
    const productId = product._id || product.id;
    console.log("ProductCard: Full product data:", product);
    console.log("ProductCard: Using ID for navigation:", productId);
    
    // Store the product data in localStorage before navigation
    localStorage.setItem('currentProduct', JSON.stringify(product));
    
    navigate(`/product/${productId}`);
  };

  return (
    <div 
      className="modern-card card-hover group cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="product-image-container">
        <img
          src={product.images?.[0] || product.image || "https://via.placeholder.com/300"}
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
          <Button 
            type="primary" 
            size="small" 
            className="primary-button"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 
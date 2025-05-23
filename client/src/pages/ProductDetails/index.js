import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
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

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the product data based on ID
  const product = mockProducts.find(p => p._id === id);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Images */}
            <div className="md:w-1/2 p-6">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:w-1/2 p-6">
              <div className="space-y-6">
                {/* Title and Description */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {product.description}
                  </p>
                </div>

                <Divider />

                {/* Key Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-semibold text-gray-900">₹{product.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-xl font-semibold text-gray-900 capitalize">{product.category}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-xl font-semibold text-gray-900">{product.age} {product.age === 1 ? 'year' : 'years'} old</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="text-xl font-semibold text-gray-900 capitalize">{product.status}</p>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Additional Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Bill Available</p>
                      <p className="text-xl font-semibold text-gray-900">{product.billAvailable ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Warranty Available</p>
                      <p className="text-xl font-semibold text-gray-900">{product.warrantyAvailable ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Accessories Available</p>
                      <p className="text-xl font-semibold text-gray-900">{product.accessoriesAvailable ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Box Available</p>
                      <p className="text-xl font-semibold text-gray-900">{product.boxAvailable ? 'Yes' : 'No'}</p>
                    </div>
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
                    Contact Seller
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

export default ProductDetails; 
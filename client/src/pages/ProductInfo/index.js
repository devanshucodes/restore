import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import Divider from "../../components/Divider";
import moment from "moment";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock product data
  const product = {
    _id: id,
    name: "Sample Product",
    description: "This is a detailed description of the sample product.",
    price: 999,
    category: "electronics",
    billAvailable: true,
    boxAvailable: true,
    accessoriesAvailable: true,
    warrantyAvailable: true,
    age: 2,
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300"
    ],
    bids: []
  };

  return (
    <div className="flex gap-5">
      <div className="w-1/2 flex flex-col gap-5">
        <div className="w-full h-96">
          <img
            src={product.images[selectedImageIndex]}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
        </div>
        <div className="flex gap-5">
          {product.images.map((image, index) => {
            return (
              <img
                src={image}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                  selectedImageIndex === index ? "border-2 border-primary" : ""
                }`}
                alt=""
                onClick={() => setSelectedImageIndex(index)}
              />
            );
          })}
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-orange-900">
            {product.name}
          </h1>
          <span>{product.description}</span>
        </div>

        <Divider />
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-orange-900">
            Product Details
          </h1>
          <div className="flex justify-between mt-2">
            <span>Price</span>
            <span>₹ {product.price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Category</span>
            <span className="uppercase">{product.category}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Bill Available</span>
            <span>{product.billAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Box Available</span>
            <span>{product.boxAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Accessories Available</span>
            <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Warranty Available</span>
            <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Purchased Year</span>
            <span>
              {moment().subtract(product.age, "years").format("YYYY")} ({product.age} years ago)
            </span>
          </div>
        </div>

        <Divider />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
          <div className="flex flex-col gap-5">
            {product.bids.length === 0 ? (
              <span>No bids yet</span>
            ) : (
              product.bids.map((bid) => {
                return (
                  <div className="flex justify-between items-center border border-gray-300 p-5 rounded">
                    <div>
                      <span className="font-semibold">{bid.user.name}</span>
                      <br />
                      <span className="text-gray-500">
                        {moment(bid.createdAt).format("MMM DD, YYYY hh:mm a")}
                      </span>
                    </div>
                    <span className="text-xl font-semibold text-green-700">
                      ₹ {bid.amount}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <Button type="primary" block>
            Place a Bid
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
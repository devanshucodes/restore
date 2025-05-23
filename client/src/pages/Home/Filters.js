import React from "react";
import { Slider, Rate } from "antd";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Furniture",
    value: "furniture",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const ages = [
  {
    name: "0-1 years old",
    value: "0-1",
  },
  {
    name: "2-4 years old",
    value: "2-4",
  },
  {
    name: "4-6 years old",
    value: "4-6",
  },
  {
    name: "6-10 years old",
    value: "6-10",
  },
  {
    name: "10+ years old",
    value: "10-50",
  },
];

const amenities = [
  {
    name: "WiFi",
    value: "WiFi",
  },
  {
    name: "Laundry",
    value: "Laundry",
  },
  {
    name: "Food",
    value: "Food",
  },
  {
    name: "Security",
    value: "Security",
  },
  {
    name: "Gym",
    value: "Gym",
  },
  {
    name: "TV Room",
    value: "TV Room",
  },
  {
    name: "Study Room",
    value: "Study Room",
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  const handlePriceRangeChange = (value) => {
    setFilters({
      ...filters,
      priceRange: value,
    });
  };

  const handleRatingChange = (value) => {
    setFilters({
      ...filters,
      rating: value,
    });
  };

  return (
    <div className="w-72 glass-effect p-5 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-primary text-xl font-semibold">Filters</h1>
        <i
          className="ri-close-line text-xl cursor-pointer text-gray-500 hover:text-primary transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col gap-6">
        {/* Price Range Filter */}
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Price Range</h1>
          <div className="px-2">
            <Slider
              range
              min={0}
              max={10000}
              step={500}
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              marks={{
                0: '₹0',
                5000: '₹5k',
                10000: '₹10k'
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Categories</h1>
          <div className="flex flex-col gap-3">
            {categories.map((category) => {
              return (
                <div
                  key={category.value}
                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                    filters.category.includes(category.value)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (filters.category.includes(category.value)) {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (c) => c !== category.value
                        ),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    }
                  }}
                >
                  <i
                    className={`ri-${
                      filters.category.includes(category.value)
                        ? "checkbox-circle-fill"
                        : "checkbox-blank-circle-line"
                    } text-lg`}
                  ></i>
                  <span>{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age Filter */}
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Age</h1>
          <div className="flex flex-col gap-3">
            {ages.map((age) => {
              return (
                <div
                  key={age.value}
                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                    filters.age.includes(age.value)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (filters.age.includes(age.value)) {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((a) => a !== age.value),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    }
                  }}
                >
                  <i
                    className={`ri-${
                      filters.age.includes(age.value)
                        ? "checkbox-circle-fill"
                        : "checkbox-blank-circle-line"
                    } text-lg`}
                  ></i>
                  <span>{age.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amenities Filter */}
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Amenities</h1>
          <div className="flex flex-col gap-3">
            {amenities.map((amenity) => {
              return (
                <div
                  key={amenity.value}
                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                    filters.amenities.includes(amenity.value)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (filters.amenities.includes(amenity.value)) {
                      setFilters({
                        ...filters,
                        amenities: filters.amenities.filter(
                          (a) => a !== amenity.value
                        ),
                      });
                    } else {
                      setFilters({
                        ...filters,
                        amenities: [...filters.amenities, amenity.value],
                      });
                    }
                  }}
                >
                  <i
                    className={`ri-${
                      filters.amenities.includes(amenity.value)
                        ? "checkbox-circle-fill"
                        : "checkbox-blank-circle-line"
                    } text-lg`}
                  ></i>
                  <span>{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Minimum Rating</h1>
          <div className="px-2">
            <Rate
              allowHalf
              value={filters.rating}
              onChange={handleRatingChange}
              className="text-lg"
            />
            <div className="text-sm text-gray-500 mt-2">
              {filters.rating > 0 ? `${filters.rating} stars and above` : 'Any rating'}
            </div>
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => {
            setFilters({
              status: "approved",
              category: [],
              age: [],
              priceRange: [0, 10000],
              amenities: [],
              rating: 0
            });
          }}
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
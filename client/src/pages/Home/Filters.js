import React from "react";

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
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
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
        <div>
          <h1 className="text-gray-700 font-medium mb-3">Categories</h1>
          <div className="flex flex-col gap-3">
            {categories.map((category) => {
              return (
                <div
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

        <div>
          <h1 className="text-gray-700 font-medium mb-3">Age</h1>
          <div className="flex flex-col gap-3">
            {ages.map((age) => {
              return (
                <div
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
      </div>
    </div>
  );
}

export default Filters;
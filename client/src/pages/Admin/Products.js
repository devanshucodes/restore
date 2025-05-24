import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";

function Products() {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      // Get products from localStorage
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      dispatch(SetLoader(false));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      
      // Update product status in localStorage
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        let products = JSON.parse(storedProducts);
        products = products.map(p => 
          p._id === id 
            ? { ...p, status, updatedAt: new Date().toISOString() }
            : p
        );
        localStorage.setItem('products', JSON.stringify(products));
        setProducts(products);
      }
      
      dispatch(SetLoader(false));
      message.success(`Product ${status} successfully`);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const statusColors = {
          pending: "text-yellow-600",
          approved: "text-green-600",
          rejected: "text-red-600",
          blocked: "text-gray-600"
        };
        return (
          <span className={`font-semibold ${statusColors[record.status]}`}>
            {record.status.toUpperCase()}
          </span>
        );
      }
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <>
                <span
                  className="text-green-600 underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "approved")}
                >
                  Approve
                </span>
                <span
                  className="text-red-600 underline cursor-pointer"
                  onClick={() => onStatusUpdate(_id, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
            {status === "approved" && (
              <span
                className="text-red-600 underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="text-green-600 underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Product Management</h2>
        <p className="text-gray-500">Review and manage product listings</p>
      </div>
      <Table 
        columns={columns} 
        dataSource={products}
        rowKey="_id"
      />
    </div>
  );
}

export default Products;
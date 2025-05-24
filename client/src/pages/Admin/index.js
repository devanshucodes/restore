import React, { useEffect } from "react";
import { Tabs, message } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    // Check if user data is loaded
    if (!user) {
      // Try to get user from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        message.error("Please login first");
        navigate("/login");
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== "admin") {
        message.error("Access denied. Admin only.");
        navigate("/");
        return;
      }
    } else if (user.role !== "admin") {
      message.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [user]);

  // Don't render anything until we verify the user
  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage products and users</p>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
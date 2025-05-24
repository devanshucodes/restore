import React, { useEffect, useState } from "react";
import { Avatar, Badge, message } from "antd";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";

function ProtectedPage({ children }) {
  const [notifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    const initializeUser = () => {
      try {
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          message.error("Please login first");
          navigate("/login");
          return;
        }

        // Initialize user in Redux store
        const userData = JSON.parse(storedUser);
        dispatch(SetUser(userData));

        // Check role-based access
        const path = window.location.pathname;
        if (path.startsWith("/admin") && userData.role !== "admin") {
          message.error("Access denied. Admin only.");
          navigate("/");
          return;
        }

        // Redirect buyers away from seller pages
        if (userData.role === "buyer" && path.startsWith("/profile")) {
          message.error("Access denied. Sellers only.");
          navigate("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        message.error("Error initializing user");
        navigate("/login");
      }
    };

    initializeUser();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <div className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1
              className="text-3xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              RESTORE
            </h1>

            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">{user.name}</span>
                  <Badge count={notifications.length} onClick={() => setShowNotifications(true)}>
                    <Avatar size="large" className="cursor-pointer" />
                  </Badge>
                  {user.role === "seller" && (
                    <span
                      className="text-primary cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      My Profile
                    </span>
                  )}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>

      {/* notifications */}
      {showNotifications && (
        <Notifications
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      )}
    </div>
  );
}

export default ProtectedPage;
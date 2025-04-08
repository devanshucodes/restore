import React, { useState } from "react";
import { Avatar, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

function ProtectedPage({ children }) {
  const [notifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data for development
  const mockUser = {
    name: "Demo User",
    role: "user"
  };

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
              DORMDWELL
            </h1>

            <div className="flex items-center gap-4">
              <div className="bg-white py-2 px-4 rounded-xl flex gap-4 items-center shadow-sm hover:shadow-md transition-all">
                <span
                  className="text-primary font-medium cursor-pointer hover:text-primary/80 transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  {mockUser.name}
                </span>
                <Badge
                  count={0}
                  onClick={() => setShowNotifications(true)}
                  className="cursor-pointer"
                >
                  <Avatar
                    shape="circle"
                    icon={<i className="ri-notification-3-line"></i>}
                    className="bg-gray-100 hover:bg-gray-200 transition-colors"
                  />
                </Badge>
                <i
                  className="ri-logout-box-r-line text-xl text-gray-600 hover:text-primary cursor-pointer transition-colors"
                  onClick={() => navigate("/login")}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>

      <Notifications
        notifications={notifications}
        reloadNotifications={() => {}}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
    </div>
  );
}

export default ProtectedPage;
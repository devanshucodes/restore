import React, { useEffect, useState } from 'react';
import { Tabs, message } from 'antd';
import Products from './Products';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      message.error('Please login first');
      window.location.href = '/login';
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
        <p className="text-gray-600">Manage your products and view bids</p>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Bids</h2>
            <p className="text-gray-600">No bids yet</p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Role:</span> {user.role}</p>
              <p><span className="font-medium">Status:</span> {user.status}</p>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
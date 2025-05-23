import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Navbar() {
  return (
    <div className="glass-effect p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Restore
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button type="primary" className="primary-button">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 
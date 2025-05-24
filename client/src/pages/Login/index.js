import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUser } from "../../redux/usersSlice";
import { SetLoader } from "../../redux/loadersSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      
      // Check for predefined credentials
      if (values.email === "admin@restore.com" && values.password === "admin") {
        const userData = {
          _id: "admin123",
          name: "Admin User",
          email: "admin@restore.com",
          role: "admin",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(SetUser(userData));
        message.success("Login successful");
        navigate("/admin");
        return;
      }

      if (values.email === "rohan@gmail.com" && values.password === "buyer") {
        const userData = {
          _id: "buyer123",
          name: "Rohan",
          email: "rohan@gmail.com",
          role: "buyer",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(SetUser(userData));
        message.success("Login successful");
        navigate("/");
        return;
      }

      if (values.email === "devanshucodes@gmail.com" && values.password === "seller") {
        const userData = {
          _id: "seller123",
          name: "Devanshu",
          email: "devanshucodes@gmail.com",
          role: "seller",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(SetUser(userData));
        message.success("Login successful");
        navigate("/profile");
        return;
      }

      // For other users, check localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        const userData = {
          ...user,
          role: "seller" // Default role for registered users
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(SetUser(userData));
        message.success("Login successful");
        navigate("/profile");
      } else {
        message.error("Invalid credentials");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoader(false));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="glass-effect p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-8 gradient-text">
          Welcome Back
        </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full primary-button"
          >
            Login
          </Button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

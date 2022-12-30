import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resources/auth.css";
import "animate.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex flex-column justify-content-center align-items-center auth">
      <img
        className={"ubus-logo-login animate__animated animate__bounceInLeft"}
        src="bus2.png"
        alt="UBus"
      />

      <div className="w-400 card p-3">
        <h1 className="text-2xl primary-text">Login</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click Here To Register</Link>
            <button className="primary-btn" type="submit">
              Login
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                onFinish({
                  email: "testuser@email.com",
                  password: "lightsquirrel978",
                });
              }}
            >
              Demo App
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

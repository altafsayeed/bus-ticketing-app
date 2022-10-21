import React from "react";
import { Form } from "antd";

function Register() {
  return (
    <div className="h-screen d-flex justify-content-center align-items-center">
      <div className="register-form card p-3">
        <h1 className="text-2xl">Register</h1>
        <hr />
        <Form layout="vertical">
          <Form.Item label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item className="text-2xl" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item className="text-2xl" label="Password">
            <input type="text" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;

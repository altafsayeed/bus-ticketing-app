import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BusForm({ showBusForm, setShowBusForm, type = "add" }) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else {
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <Modal
      title="Add Bus"
      width="800px"
      visible={showBusForm}
      onCancel={() => setShowBusForm(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="bus name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="busNumber">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Journey Date" name="journeyDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure time" name="departure">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival time" name="arrival">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Fare" name="fare">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;

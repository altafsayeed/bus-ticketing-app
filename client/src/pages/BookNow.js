import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div className="book-now">
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <a className="back-button" href="/">
              Back
            </a>
            <hr />
            <h1 className="booking-bus-name">{bus.busName}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />
            <div className="flex flex-col gap-1">
              <h5 className="booking-details">
                <b>Journey Date : </b>
                {moment(bus.journeyDate).format("MM-DD-YYYY")}
              </h5>
              <h5 className="booking-details">
                <b>Fare :</b> ${bus.fare}
              </h5>
              <h5 className="booking-details">
                <b>Departure Time :</b> {bus.departure}
              </h5>
              <h5 className="booking-details">
                <b>Arrival Time :</b> {bus.arrival}
              </h5>
              <h5 className="booking-details">
                <b>Bus Capacity :</b> {bus.capacity}
              </h5>
              <h5 className="booking-details">
                <b>Available Seats :</b> {bus.capacity - bus.seatsBooked.length}
              </h5>
            </div>
            <hr />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl">
                <b>Selected Seats :</b> {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl mt-2">
                <b>Total Price :</b> ${bus.fare * selectedSeats.length}
              </h1>
              <hr />

              <StripeCheckout
                billingAddress
                token={onToken}
                amount={bus.fare * selectedSeats.length * 100}
                stripeKey="pk_test_51LwFznGRwPBkpCZbrmooxB4J1BXXKs61WSyzg4wXqSQ1p2ueAJY0tJpCMwfilBynGEbwnskah3MHCOURoQ0ev5di004W9R519r"
              >
                <button
                  className={`primary-btn ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;

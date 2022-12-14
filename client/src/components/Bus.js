import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg primary-text">{bus.busName}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">From</p>
          <p className="text-sm">{bus.from}</p>
        </div>
        <div>
          <p className="text-sm">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>
        <div>
          <p className="text-sm">Fare</p>
          <p className="text-sm">${bus.fare}</p>
        </div>
      </div>
      <hr className="bus-card-hr" />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm mt-0">Journey Date</p>
          <p className="text-sm">
            {moment(bus.journeyDate).format("MM-DD-YYYY")}
          </p>
        </div>
        <button
          className="secondary-btn"
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
            window.location.reload();
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Bus;

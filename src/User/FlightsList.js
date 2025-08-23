import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./FlightsList.css";

export default function FlightsList() {
  const location = useLocation();
  const formData = location.state;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(""); // زر الكل افتراضي

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, [sortBy]);

  const fetchFlights = async () => {
    try {
      setLoading(true);

      let payload = {};
      if (formData.tripType === "oneway") {
        payload = {
          starting_point_location: formData.departure,
          landing_point_location: formData.arrival,
          is_round_trip: 0,
          date: formData.startDate,
          passenger_count: formData.adults,
        };
      } else {
        payload = {
          starting_point_location: formData.departure,
          landing_point_location: formData.arrival,
          is_round_trip: 1,
          departure_date: formData.startDate,
          return_date: formData.endDate,
          passenger_count: formData.adults,
        };
      }

      if (sortBy) {
        payload.sort_by = sortBy;
      }

      const res = await axios.post("http://127.0.0.1:8000/api/filterFlights", payload);
      if (res.data.status) {
        setFlights(res.data.data);
      } else {
        setFlights([]);
      }
    } catch (err) {
      console.error(err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-container">
      <h2 className="flights-title">✈ الرحلات المتاحة</h2>

      {/* أزرار الفلترة */}
      <div className="filter-bar">
        <button
          className={sortBy === "" ? "active" : ""}
          onClick={() => setSortBy("")}
        >
          الكل 🌍
        </button>
        <button
          className={sortBy === "price" ? "active" : ""}
          onClick={() => setSortBy("price")}
        >
          الأرخص 💰
        </button>
        <button
          className={sortBy === "shortest" ? "active" : ""}
          onClick={() => setSortBy("shortest")}
        >
          الأسرع ⚡
        </button>
      </div>

      {loading ? (
        <p className="loading">جارِ تحميل الرحلات...</p>
      ) : flights.length === 0 ? (
        <p className="no-results">لا توجد رحلات متاحة</p>
      ) : (
        flights.map((flight, idx) => {
          // إذا كانت الرحلة اتجاه واحد
          if (formData.tripType === "oneway" || flight.air_line) {
            return (
              <div className="flight-card" key={idx}>
                <div className="flight-header">
                  <span className="airline">{flight.air_line?.air_line_name}</span>
                  <span className="price-tag">{flight.price} $</span>
                </div>
                <div className="flight-route">
                  <strong>{flight.starting_point_location}</strong>
                  <div className="arrow">➔</div>
                  <strong>{flight.landing_point_location}</strong>
                </div>
                <div className="flight-details">
                  <span>🕒 {flight.start_time}</span>
                  <span>⏱ {flight.estimated_time} ساعة</span>
                </div>
              </div>
            );
          }

          // إذا كانت الرحلة ذهاب وعودة
          if (flight.go && flight.return) {
            return (
              <div className="roundtrip-card" key={idx}>
                <div className="trip-header">
                  <span className="airline">{flight.go.air_line?.air_line_name}</span>
                  <span className="price-tag">
                    💰 {flight.go.price + flight.return.price} $
                  </span>
                </div>

                {/* الذهاب */}
                <div className="trip-segment">
                  <h4>الذهاب</h4>
                  <div className="flight-route">
                    <strong>{flight.go.starting_point_location}</strong>
                    <div className="arrow">➔</div>
                    <strong>{flight.go.landing_point_location}</strong>
                  </div>
                  <div className="flight-details">
                    <span>🕒 {flight.go.start_time}</span>
                    <span>⏱ {flight.go.estimated_time} ساعة</span>
                  </div>
                </div>

                {/* العودة */}
                <div className="trip-segment">
                  <h4>العودة</h4>
                  <div className="flight-route">
                    <strong>{flight.return.starting_point_location}</strong>
                    <div className="arrow">➔</div>
                    <strong>{flight.return.landing_point_location}</strong>
                  </div>
                  <div className="flight-details">
                    <span>🕒 {flight.return.start_time}</span>
                    <span>⏱ {flight.return.estimated_time} ساعة</span>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })
      )}
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OwnerDetails.css";
import "./RoomDetails.css";

export default function RoomDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const token = "8izVrtthWL2vU0kXrWV1w4wWqT9JT2z3M1gKY0hlfe25f76e";

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/ShowRoom/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات الغرفة");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (!sliderRef.current) return;
    if (isPaused) return;
    if (!data || !data.pictures) return;
    const slider = sliderRef.current;
    const scrollAmount = 1;

    const card = slider.querySelector(".room-picture-card");
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    const originalPicturesLength = data.pictures.length;
    const totalWidth = originalPicturesLength * (cardWidth + gap);

    let isResetting = false;
    const interval = setInterval(() => {
      if (isResetting) return;
      if (slider.scrollLeft >= totalWidth) {
        isResetting = true;
        slider.style.scrollBehavior = "auto";
        slider.scrollLeft = 0;
        setTimeout(() => {
          slider.style.scrollBehavior = "smooth";
          isResetting = false;
        }, 20);
      } else {
        slider.scrollLeft += scrollAmount;
      }
    }, 16);
    slider._interval = interval;

    return () => {
      if (slider._interval) clearInterval(slider._interval);
    };
  }, [isPaused, data]);

  const scrollSlider = (dir) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const card = slider.querySelector(".room-picture-card");
    const cardWidth = card ? card.offsetWidth : 220;
    const gap = 20;
    const amount = cardWidth + gap;
    slider.scrollLeft += dir === "left" ? -amount : amount;
  };

  if (loading)
    return <div className="room-details-loading">جاري التحميل...</div>;
  if (error) return <div className="room-details-error">{error}</div>;
  if (!data) return null;

  const { room, pictures } = data;

  return (
    <div className="room-details-container">
      <div className="room-pictures-section" style={{ width: "85%" }}>
        <h2 className="room-pictures-title">Pictures</h2>
        <div
          className="room-pictures-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="room-pictures-slider"
            ref={sliderRef}
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              display: "flex",
              gap: "20px",
            }}
          >
            {pictures.length > 0 ? (
              [...pictures, ...pictures, ...pictures].map((pic, idx) => (
                <div className="room-picture-card" key={`pic-${pic.id}-${idx}`}>
                  <img
                    className="room-picture-img"
                    src={
                      pic.room_picture.startsWith("http")
                        ? pic.room_picture
                        : `http://localhost:8000/${pic.room_picture}`
                    }
                    alt={`Room pic ${(idx % pictures.length) + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="room-picture-empty">No pictures available</div>
            )}
          </div>
          {pictures.length > 0 && (
            <>
              <button
                className="slider-arrow left"
                onClick={() => scrollSlider("left")}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                className="slider-arrow right"
                onClick={() => scrollSlider("right")}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className="room-details-card"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <h2 className="room-details-title">Room Details</h2>
        <div className="room-details-section">
          <b>ID:</b> {room.id}
        </div>
        <div className="room-details-section">
          <b>Price:</b>{" "}
          {room.offer_price !== null && room.offer_price !== "" && room.offer_price !== 0.00 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#b23c3c",
                  marginRight: 8,
                }}
              >
                {room.price}$
              </span>
              <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                {room.offer_price}$
              </span>
            </>
          ) : (
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{room.price}$</span>
          )}
        </div>
        <div className="room-details-section">
          <b>Area:</b> {room.area} m²
        </div>
        <div className="room-details-section">
          <b>People Count:</b> {room.people_count}
        </div>
        <div className="room-details-section">
          <b>Description:</b> {room.description}
        </div>
      </div>
    </div>
  );
}

// {pictures.length > 0 ? (
//   (pictures || []).concat(pictures || []).map((pic, idx) => (
//     <div className="owner-picture-card" key={idx}>
//       <img
//         className="owner-picture-img"
//         src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80&sig=${idx}`}
//         alt={`Owner pic ${idx + 1}`}
//       />
//     </div>
//   ))
// ) : (
//   <div className="owner-picture-empty">No pictures available</div>
// )}
// {pictures.length > 0 ? (
//   (pictures || []).concat(pictures || []).map((pic, idx) => (
//     <div className="owner-picture-card" key={idx}>
//       <img
//         className="owner-picture-img"
//         src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80&sig=${idx}`}
//         alt={`Owner pic ${idx + 1}`}
//       />
//     </div>
//   ))
// ) : (
//   <></>
// )}

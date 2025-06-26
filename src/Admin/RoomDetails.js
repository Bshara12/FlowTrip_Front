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

  const token = "TUtKG7wtaK5kYvqXJyDuGzXxusGYucL4FVJLNBxbbe0d32b9";

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

  if (loading)
    return <div className="owner-details-loading">جاري التحميل...</div>;
  if (error) return <div className="owner-details-error">{error}</div>;
  if (!data) return null;

  const { room, pictures } = data;

  return (
    <div className="owner-details-container">
      <div className="owner-pictures-section" style={{ width: "85%" }}>
        <h2 className="owner-pictures-title">Pictures</h2>
        <div className="slider">
          <div className="owner-ictures-slider">
            {pictures.length > 0 ? (
              pictures.map((pic, idx) => (
                <div className="owner-picture-card" key={idx}>
                  <img
                    className="owner-picture-img"
                    src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80&sig=${idx}`}
                    alt={`Owner pic ${idx + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="owner-picture-empty">No pictures available</div>
            )}
          </div>
          <div className="owner-ictures-slider">
            {pictures.length > 0 ? (
              pictures.map((pic, idx) => (
                <div className="owner-picture-card" key={idx}>
                  <img
                    className="owner-picture-img"
                    src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80&sig=${idx}`}
                    alt={`Owner pic ${idx + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="owner-picture-empty">No pictures available</div>
            )}
          </div>
        </div>
      </div>
      <div
        className="owner-details-card"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <h2 className="owner-details-title">Room Details</h2>
        <div className="owner-details-section">
          <b>ID:</b> {room.id}
        </div>
        <div className="owner-details-section">
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
        <div className="owner-details-section">
          <b>Area:</b> {room.area} m²
        </div>
        <div className="owner-details-section">
          <b>People Count:</b> {room.people_count}
        </div>
        <div className="owner-details-section">
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

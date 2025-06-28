import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./OwnerDetails.css";
import ToggleButton from '../Component/ToggleButton';

export default function OwnerDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const token = "8izVrtthWL2vU0kXrWV1w4wWqT9JT2z3M1gKY0hlfe25f76e";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/ShowOwner/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
        // تحديث حالة الحظر بناءً على status المستخدم
        if (res.data?.owner?.user?.status === 2) {
          setIsBlocked(true);
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!sliderRef.current) return;
    if (isPaused) return;
    if (!data || !data.pictures) return;
    const slider = sliderRef.current;
    const scrollAmount = 1;

    const card = slider.querySelector(".owner-picture-card");
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    const totalWidth = data.pictures.length * (cardWidth + gap);

    let isResetting = false;
    const interval = setInterval(() => {
      if (isResetting) return;
      if (slider.scrollLeft >= totalWidth) {
        isResetting = true;
        slider.style.scrollBehavior = "auto";
        slider.scrollLeft = slider.scrollLeft - totalWidth;
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
    const card = slider.querySelector(".owner-picture-card");
    const cardWidth = card ? card.offsetWidth : 220;
    const gap = 20;
    const amount = cardWidth + gap;
    slider.scrollLeft += dir === "left" ? -amount : amount;
  };

  const handleToggleBlock = async (checked) => {
    try {
      
      const response = await axios.get(
        `http://127.0.0.1:8000/api/BlockOwner/${data?.owner?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        setIsBlocked(checked);
      }
    } catch (error) {
      console.error("خطأ في تحديث حالة الحظر:", error);
      // إعادة تعيين الحالة في حالة الخطأ
      setIsBlocked(!checked);
    }
  };

  if (loading)
    return <div className="owner-details-loading">جاري التحميل...</div>;
  if (error) return <div className="owner-details-error">{error}</div>;
  if (!data) return null;

  const { owner, details, vehicles, services, pictures, packages } = data;
  const user = owner.user;
  const country = owner.country;
  const ownerCategory = owner.owner_category_id;

  // دوال مساعدة لعرض التفاصيل الخاصة بكل نوع
  function renderCategoryDetails() {
    switch (ownerCategory) {
      case 1: // Accommodation
        return (
          <>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">🏨</span>Accommodation
                Type:
              </span>
              <span className="owner-details-value">
                {details?.accommodation_type || "-"}
              </span>
            </div>
          </>
        );
      case 2: // Air Line
        return (
          <>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">✈️</span>Air Line Name:
              </span>
              <span className="owner-details-value">
                {details?.air_line_name || "-"}
              </span>
            </div>
          </>
        );
      case 3: // Tourism Company
        return (
          <>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">🏢</span>Company Name:
              </span>
              <span className="owner-details-value">
                {details?.company_name || "-"}
              </span>
            </div>
          </>
        );
      case 4: // Vehicle Owner
        return (
          <>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">🧑‍💼</span>Owner Name:
              </span>
              <span className="owner-details-value">
                {details?.owner_name || "-"}
              </span>
            </div>
          </>
        );
      case 5: // Activity Owner
        return (
          <>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">🧑‍💼</span>Owner Name:
              </span>
              <span className="owner-details-value">
                {details?.activity_owner.owner_name || "-"}
              </span>
            </div>
            <div className="owner-details-section">
              <span className="owner-details-label">
                <span className="owner-details-icon">🎯</span>Activity:
              </span>
              <span className="owner-details-value">
                {details?.activity || "-"}
              </span>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="owner-details-container">
      <div className="owner-details-top">
        <div className="owner-details-card">
          <h2 className="owner-details-title">Business Information</h2>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">🏷️</span>Category:
            </span>
            <span className="owner-details-value">
              {owner?.category || "-"}
            </span>
          </div>
          {renderCategoryDetails()}
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">📍</span>Location:
            </span>
            <span className="owner-details-value">
              {owner?.location || "-"}
            </span>
          </div>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">📝</span>Description:
            </span>
            <span className="owner-details-value">
              {owner?.description || "-"}
            </span>
          </div>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">📅</span>Creation date:
            </span>
            <span className="owner-details-value">
              {owner?.created_at?.slice(0, 10) || "-"}
            </span>
          </div>
        </div>
        <div className="owner-details-card">
          <h2 className="owner-details-title">User Information</h2>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">👤</span>User Name:
            </span>
            <span className="owner-details-value">{user?.name || "-"}</span>
          </div>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">✉️</span>Email:
            </span>
            <span className="owner-details-value">{user?.email || "-"}</span>
          </div>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">📞</span>Phone Number:
            </span>
            <span className="owner-details-value">
              {user?.phone_number || "-"}
            </span>
          </div>
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">🌍</span>Country:
            </span>
            <span className="owner-details-value">{country || "-"}</span>
          </div>
        </div>
      </div>
      <div className="more-info-section">
        <div className="owner-services-section">
          <h2 className="owner-services-title">Services</h2>
          <div className="owner-services-list">
            {services && services.length > 0 ? (
              services.map((service) => (
                <div className="owner-service-card" key={service.id}>
                  <span className="owner-service-icon">
                    {service.name.toLowerCase().includes("wifi") && "📶"}
                    {service.name.toLowerCase().includes("buffet") && "🍽️"}
                    {!service.name.toLowerCase().includes("wifi") &&
                      !service.name.toLowerCase().includes("buffet") &&
                      "🛎️"}
                  </span>
                  <span className="owner-service-name">{service.name}</span>
                </div>
              ))
            ) : (
              <div className="owner-service-empty">No services available</div>
            )}
          </div>
        </div>
        <div className="owner-pictures-section">
          <h2 className="owner-pictures-title">Pictures</h2>
          <div
            className="owner-pictures-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ position: "relative" }}
          >
            {pictures.length > 0 && (
              <button
                className="slider-arrow left"
                onClick={() => scrollSlider("left")}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}
            <div
              className="owner-pictures-slider"
              ref={sliderRef}
              style={{
                overflowX: "auto",
                scrollBehavior: "smooth",
                display: "flex",
                gap: "20px",
              }}
            >
              {pictures.length > 0 ? (
                (pictures || []).concat(pictures || []).map((pic, idx) => (
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
            {pictures.length > 0 && (
              <button
                className="slider-arrow right"
                onClick={() => scrollSlider("right")}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
        {owner?.owner_category_id === 3 && packages.length > 0 && (
          <div className="owner-services-section">
            <h2 className="owner-services-title">Packages</h2>
            <div className="owner-services-list">
              {packages.map((pkg, idx) => (
                <div className="owner-service-card" key={pkg.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span className="owner-service-icon">🧳</span>
                      <span style={{color: 'var(--color1)'}}><b>Price:</b> <span style={{color: 'var(--color2)', fontWeight: 'bold'}}>{pkg.total_price}$</span></span>
                    </div>
                    <span style={{color: 'var(--color1)'}}><b>Payment:</b> <span style={{color: 'var(--color2)', fontWeight: 'bold'}}>{pkg.payment_by_points === 1 ? 'By Points' : 'By Money'}</span></span>
                    <span style={{color: 'var(--color1)'}}><b>Description:</b><span style={{color: 'var(--color2)', fontWeight: '600'}}> {pkg.discription && pkg.discription.length > 30 ? pkg.discription.slice(0, 30) + '...' : pkg.discription}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {owner?.owner_category_id === 4 && vehicles.length > 0 && (
          <div className="owner-services-section">
            <h2 className="owner-services-title">Vehicles</h2>
            <div className="owner-services-list">
              {vehicles.map((v, idx) => (
                <div className="owner-service-card" key={v.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <span className="owner-service-icon">🚙</span>
                    <span style={{color: 'var(--color1)'}}><b>Type:</b> <span style={{color: 'var(--color2)', fontWeight: 'bold'}}>{v.car_type}</span></span></div>
                    <span style={{color: 'var(--color1)'}}><b>Description:</b><span style={{color: 'var(--color2)', fontWeight: 'w600'}}> {v.car_discription && v.car_discription.length >38 ? v.car_discription.slice(0, 38) + '...' : v.car_discription}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {owner?.owner_category_id === 1 && details?.accommodation_type === "Hotel" && Array.isArray(data.rooms) && data.rooms.length > 0 && (
        <div className="hotel-rooms-section">
          <h2 className="hotel-rooms-title">Rooms</h2>
          <div className="hotel-rooms-list">
            {data.rooms.map((room) => (
              <div
                className="hotel-room-card"
                key={room.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/room-details/${room.id}`)}
                title="Show room details"
              >
                <div className="hotel-room-info">
                  <div>
                    <b>Price:</b>{" "}
                    {room.offer_price !== null && room.offer_price !== "" && room.offer_price !== 0.00 ? (
                      <>
                        <span style={{ textDecoration: "line-through", color: "#b23c3c", marginRight: 8 }}>{room.price}$</span>
                        <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{room.offer_price}$</span>
                      </>
                    ) : (
                      <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{room.price}$</span>
                    )}
                  </div>
                  <div><b>Area:</b> {room.area} m²</div>
                  <div><b>People Count:</b> {room.people_count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      <div style={{position: 'absolute', top:'calc(1rem + 1vw)', right: 'calc(1rem + 1vw)'}}>
        <ToggleButton
          checked={isBlocked}
          onChange={(e) => handleToggleBlock(e.target.checked)}
          width={90}
          height={35}
          toggleWidth={37}
          toggleHeight={23}
        />
      </div>
    </div>
  );
}

// src={
//   pic.reference.startsWith("http")
//     ? pic.reference
//     : `http://localhost:8000/${pic.reference}`
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OwnerDetailsComponent.css";
import ToggleButton from "./ToggleButton";
import Loader from "../Component/Loader";
import Button from "./AddButton";
import ConfirmDialog from "./ConfirmDialog";
import CloseButton from "../Component/CloseButton";
import EditButton from "./EditButton";

export default function OwnerDetailsComponent({ id, token, isAdmin = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [serviceToDelete2, setServiceToDelete2] = useState(null);
  const [newService, setNewService] = useState("");

  const authToken = token || "8izVrtthWL2vU0kXrWV1w4wWqT9JT2z3M1gKY0hlfe25f76e";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (id) {
        url = `http://127.0.0.1:8000/api/ShowOwner/${id}`;
      } else {
        url = `http://127.0.0.1:8000/api/ShowProfile`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(res.data);

      if (isAdmin && res.data?.owner?.user?.status === 2) {
        setIsBlocked(true);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, authToken, isAdmin]);

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
    const card = slider.querySelector(".owner-picture-card");
    const cardWidth = card ? card.offsetWidth : 220;
    const gap = 20;
    const amount = cardWidth + gap;
    slider.scrollLeft += dir === "left" ? -amount : amount;
  };

  const handleToggleBlock = async (checked) => {
    if (!isAdmin) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/BlockOwner/${data.owner.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsBlocked(checked);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenServicesModal = async () => {
    setShowServicesModal(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/GetAllServices");
      const data = await response.json();
      setAllServices(data.services || []);
    } catch (error) {
      setAllServices([]);
    }
  };
  const handleCloseServicesModal = () => {
    setSelectedServices([]);
    setNewService("");
    setServiceToDelete(null);
    setServiceToDelete2(null);
    setShowServicesModal(false);
  };

  const toggleService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleDoneAddServices = async () => {
    // 1. جهّز مصفوفة الخدمات لإرسالها
    const servicesToSend = [...selectedServices];
    const trimmedNew = newService.trim();
    if (trimmedNew) {
      servicesToSend.push(trimmedNew);
    }

    // 2. إذا لم يختَر المستخدم شيئًا ولم يدخل جديدًا، اغلق المودال وارجع
    if (servicesToSend.length === 0) {
      setShowServicesModal(false);
      return;
    }

    try {
      await fetch("http://127.0.0.1:8000/api/AddService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ services: servicesToSend }),
      });

      setShowServicesModal(false);
      setSelectedServices([]);
      setNewService("");
      fetchData();
    } catch (error) {
      alert("Failed to add services");
      console.log(error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      serviceId = serviceToDelete2;
      await fetch(`http://127.0.0.1:8000/api/DeleteService/${serviceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      alert("Failed to delete service");
      console.log(error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="owner-details-error">{error}</div>;
  if (!data) return null;

  const { owner, details, vehicles, services, pictures, packages } = data;
  const user = owner.user;
  const country = owner.country;
  const ownerCategory = owner.owner_category_id;

  function renderCategoryDetails() {
    switch (ownerCategory) {
      case 1:
        return (
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">🏨</span>Accommodation Type:
            </span>
            <span className="owner-details-value">
              {details?.accommodation_type || "-"}
            </span>
          </div>
        );
      case 2:
        return (
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">✈️</span>Air Line Name:
            </span>
            <span className="owner-details-value">
              {details?.air_line_name || "-"}
            </span>
          </div>
        );
      case 3:
        return (
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">🏢</span>Company Name:
            </span>
            <span className="owner-details-value">
              {details?.company_name || "-"}
            </span>
          </div>
        );
      case 4:
        return (
          <div className="owner-details-section">
            <span className="owner-details-label">
              <span className="owner-details-icon">🧑‍💼</span>Owner Name:
            </span>
            <span className="owner-details-value">
              {details?.owner_name || "-"}
            </span>
          </div>
        );
      case 5:
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
    <div className="owner-details-container" style={{ position: "relative" }}>
      {!isAdmin && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
          <EditButton />
        </div>
      )}
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
        <div
          className="owner-services-section"
          style={{ position: "relative" }}
        >
          <Button
            text="Add Service"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
            onClick={handleOpenServicesModal}
          />
          <h2 className="owner-services-title">Services</h2>
          <div className="owner-services-list">
            {services && services.length > 0 ? (
              services.map((service) => (
                <div
                  className="owner-service-card"
                  key={service.id}
                  style={{ position: "relative" }}
                  onMouseEnter={() => {
                    setServiceToDelete(service.id);
                    setServiceToDelete2(service.id);
                  }}
                  onMouseLeave={() => setServiceToDelete(null)}
                >
                  <span className="owner-service-icon">🛎️</span>
                  <span className="owner-service-name">{service.name}</span>
                  {serviceToDelete === service.id && (
                    <button
                      className="delete-service-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteDialog(true);
                      }}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        border: "none",
                      }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "var(--color2)" }}
                      ></i>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="owner-service-empty">No services available</div>
            )}
          </div>
          {showServicesModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div
                  onClick={handleCloseServicesModal}
                  style={{ float: "left" }}
                >
                  <CloseButton></CloseButton>
                </div>
                <h3>All Services</h3>
                <div className="services-grid">
                  {allServices.length > 0 ? (
                    allServices.map((service) => (
                      <div
                        className={`service-card${
                          selectedServices.includes(service.name)
                            ? " selected"
                            : ""
                        }`}
                        key={service.id}
                        onClick={() => toggleService(service.name)}
                      >
                        <span className="service-icon">🛎️</span>
                        <span className="service-name">{service.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="no-services">لا توجد خدمات متاحة</div>
                  )}
                </div>
                <div className="service-input">
                  <input
                    type="text"
                    autocomplete="off"
                    name="text"
                    class="new-service-input"
                    placeholder="New Service"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  />
                </div>
                <button className="done-btn" onClick={handleDoneAddServices}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
        {showDeleteDialog && (
          <ConfirmDialog
            message="Are you sure you want to delete this service?"
            onConfirm={async () => {
              await handleDeleteService(serviceToDelete);
              setShowDeleteDialog(false);
              setServiceToDelete(null);
            }}
            onCancel={() => {
              setShowDeleteDialog(false);
              setServiceToDelete(null);
            }}
            color="false"
          />
        )}
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
                [...pictures, ...pictures, ...pictures].map((pic, idx) => (
                  <div
                    className="owner-picture-card"
                    key={`pic-${pic.id}-${idx}`}
                  >
                    <img
                      className="owner-picture-img"
                      src={
                        pic.reference && pic.reference.startsWith("http")
                          ? pic.reference
                          : `http://localhost:8000/${pic.reference}`
                      }
                      alt={`Owner pic ${(idx % pictures.length) + 1}`}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/180x120?text=No+Image";
                      }}
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
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="owner-service-icon">🧳</span>
                      <span style={{ color: "var(--color1)" }}>
                        <b>Price:</b>{" "}
                        <span
                          style={{ color: "var(--color2)", fontWeight: "bold" }}
                        >
                          {pkg.total_price}$
                        </span>
                      </span>
                    </div>
                    <span style={{ color: "var(--color1)" }}>
                      <b>Payment:</b>{" "}
                      <span
                        style={{ color: "var(--color2)", fontWeight: "bold" }}
                      >
                        {pkg.payment_by_points === 1 ? "By Points" : "By Money"}
                      </span>
                    </span>
                    <span style={{ color: "var(--color1)" }}>
                      <b>Description:</b>
                      <span
                        style={{ color: "var(--color2)", fontWeight: "600" }}
                      >
                        {" "}
                        {pkg.discription && pkg.discription.length > 30
                          ? pkg.discription.slice(0, 30) + "..."
                          : pkg.discription}
                      </span>
                    </span>
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
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="owner-service-icon">🚙</span>
                      <span style={{ color: "var(--color1)" }}>
                        <b>Type:</b>{" "}
                        <span
                          style={{ color: "var(--color2)", fontWeight: "bold" }}
                        >
                          {v.car_type}
                        </span>
                      </span>
                    </div>
                    <span style={{ color: "var(--color1)" }}>
                      <b>Description:</b>
                      <span
                        style={{ color: "var(--color2)", fontWeight: "w600" }}
                      >
                        {" "}
                        {v.car_discription && v.car_discription.length > 38
                          ? v.car_discription.slice(0, 38) + "..."
                          : v.car_discription}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {owner?.owner_category_id === 1 &&
          details?.accommodation_type === "Hotel" &&
          Array.isArray(data.rooms) &&
          data.rooms.length > 0 && (
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
                        {room.offer_price !== null &&
                        room.offer_price !== "" &&
                        room.offer_price !== 0.0 ? (
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
                            <span
                              style={{ color: "#2e7d32", fontWeight: "bold" }}
                            >
                              {room.offer_price}$
                            </span>
                          </>
                        ) : (
                          <span
                            style={{ color: "#2e7d32", fontWeight: "bold" }}
                          >
                            {room.price}$
                          </span>
                        )}
                      </div>
                      <div>
                        <b>Area:</b> {room.area} m²
                      </div>
                      <div>
                        <b>People Count:</b> {room.people_count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      {isAdmin && (
        <div
          style={{
            position: "absolute",
            top: "calc(1rem + 1vw)",
            right: "calc(1rem + 1vw)",
          }}
        >
          <ToggleButton
            checked={isBlocked}
            onChange={(e) => handleToggleBlock(e.target.checked)}
            width={90}
            height={35}
            toggleWidth={37}
            toggleHeight={23}
          />
        </div>
      )}
    </div>
  );
}

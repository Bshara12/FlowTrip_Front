import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBars,FaTimes,FaUser,FaMoon,FaGlobe,FaPhone,FaHome,FaPlane,FaBox,FaCar}from "react-icons/fa";
import PackageCard from "../Component/PackageCard";
import Loader from "../Component/Loader";
import loadingImage from "../Assets/Loading_icon.gif"; 
import "./HomePage.css";

export default function Homepage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const navigate = useNavigate();

  const closeSidebar = () => setIsSidebarOpen(false);
const [accommodations, setAccommodations] = useState([]);
const [loadingAccommodations, setLoadingAccommodations] = useState(true);

useEffect(() => {
  const fetchAccommodations = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/getRandomAccommodations");
      const data = await res.json();
      if (data) setAccommodations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccommodations(false);
    }
  };

  fetchAccommodations();
}, []);


  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/getRandomPackage");
        const data = await res.json();
        if (data && data.data) setPackages(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPackages(false);
      }
    };

    const fetchActivities = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/getRandomActivity");
        const data = await res.json();
        if (data) setActivities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchPackages();
    fetchActivities();
  }, []);

  const handlePackageClick = (id) => navigate(`/package-details/${id}`);

  // إعدادات السلايدر
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: packages.length,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
const getImageUrl = (picture) => {
  if (!picture) return null;

  if (picture.includes("storage\\")) {
    const fileName = picture.split("\\").pop(); 
    return `http://127.0.0.1:8000/storage/images/${fileName}`;
  }

  if (picture.includes("storage/")) {
    const fileName = picture.split("/").pop();
    return `http://127.0.0.1:8000/storage/images/${fileName}`;
  }

  return picture;
};


  return (
    <div className="homepage-container">
{/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Flow Trip</h2>
        <div
          className="menu-icon"
          onClick={() => setIsSidebarOpen(true)}
          title="Settings"
        >
          <FaBars />
        </div>
      </nav>

      {/* Buttons تحت الناف بار */}
      <div className="nav-buttons">
        <button><FaHome /> Home</button>
        <button><FaPlane /> Flights</button>
        <button><FaCar /> Cars</button>
        <button><FaBox /> Packages</button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

 {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>الإعدادات</h3>
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul>
          <li><FaUser className="icon" /> الحساب</li>
          <li><FaMoon className="icon" /> الوضع الليلي</li>
          <li><FaGlobe className="icon" /> اللغة</li>
          <li><FaPhone className="icon" /> الدعم الفني</li>
        </ul>
      </div>

      <h2 style={{ textAlign: "center", margin: "40px 0", color: "#2c3e50" }}>
        ✨ اكتشف باقاتنا المميزة ✨
      </h2>
      

      {/* Slider للباقات */}
      {loadingPackages ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <img
            src={loadingImage}
            alt="Loading..."
            style={{ width: "100px", margin: "50px auto" }}
          />
        </div>
      ) : (
        <Slider {...sliderSettings} className="package-slider">
          {packages.map((pkg) => (
            <div key={pkg.id}>
              <PackageCard
                id={pkg.id}
                image={getImageUrl(pkg.picture)}
                title={pkg.tourism_company?.company_name || "Unknown Company"}
                description={pkg.description}
                price={pkg.total_price}
                isPointPayment={pkg.payment_by_points === 1}
                onClick={() => handlePackageClick(pkg.id)}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* قسم الأنشطة */}
      <h2 style={{ textAlign: "center", margin: "60px 0 20px", color: "#2c3e50" }}>
        🌟 اكتشف أنشطتنا المميزة 🌟
      </h2>

      {loadingActivities ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
       <div className="activities-grid">
  {activities.map((act, index) => (
    <div
      key={act.id}
      className={`activity-card ${index < 2 ? "large-card" : "small-card"}`}
    >
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
        alt={act.activity_name}
        className="activity-img"
      />
      <div className="activity-overlay">
        <h3>{act.activity_name}</h3>
        <p>{act.owner_name}</p>
        <p>{act.location}, {act.country_name}</p>
      </div>
    </div>
  ))}
</div>

      )}
      <h2
  style={{
    textAlign: "center",
    margin: "60px 0 20px",
    color: "#2c3e50",
  }}
>
  🏡 اكتشف إقاماتنا المميزة 🏡
</h2>
<div className="section-divider"></div>

{loadingAccommodations ? (
  <div style={{ textAlign: "center" }}>
    <Loader />
  </div>
) : (
<div className="accommodations-grid">
  {accommodations.map((acc) => (
    <div key={acc.id} className="accommodation-card">
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
        alt={acc.type_name}
        className="accommodation-img"
      />
      <div className="accommodation-info">
        <h3>{acc.type_name}</h3>
        <p>{acc.owner_location}</p>
        <p>
          {acc.offer_price ? (
            <>
              <span className="old-price">${acc.price}</span>{" "}
              <span className="new-price">${acc.offer_price}</span>
            </>
          ) : acc.pice ? (
            <span>${acc.price}</span>
          ) : (
            <span>Price not available</span>
          )}
        </p>
      </div>
    </div>
  ))}
</div>

)}

    </div>
  );
}

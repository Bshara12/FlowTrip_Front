import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL,LOGOUT } from "../Api/Api";

export default function DashBourd() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/Admin/dashbord/restaurants");
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    const token = Cookies.get("authToken");
    try {
      const response = await fetch(`${baseURL}/${LOGOUT}`, {
        method: "GET",
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error during logout. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="maincontainer">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={`sidpare ${collapsed ? "collapsed" : ""}`}>
        <img
          src={require("../Assets/logo-removebg-preview.png")}
          alt="Logo"
          className={collapsed ? "small" : ""}
        />
        <div
          className="longright"
          onClick={handleToggleCollapse}
          style={{ color: "var(--color1)" }}
        >
          <i
            className={`fa-solid fa-arrow-right-long ${
              collapsed ? "expanded" : ""
            }`}
          ></i>
        </div>
        <div style={{ width: "100%" }}>
          <Link
            to="homepage"
            className={
              activeLink === "/Accommodation/dashboard/homepage" ? "active-link" : ""
            }
          >
            <i className="fas fa-clipboard-list"></i>
            <p>HomePage</p>
          </Link>
          <Link
            to="profile"
            className={
              activeLink === "/Accommodation/dashboard/profile" ? "active-link" : ""
            }
          >
            <i className="fas fa-clipboard-list"></i>
            <p>Profile</p>
          </Link>
          <Link
            to="records"
            className={
              activeLink === "/Accommodation/dashboard/records" ? "active-link" : ""
            }
          >
            <i className="fas fa-clipboard-list"></i>
            <p>Records</p>
          </Link>
          <Link
            to="rooms"
            className={
              activeLink === "/Accommodation/dashboard/rooms" ? "active-link" : ""
            }
          >
            <i className="fas fa-clipboard-list"></i>
            <p>Rooms</p>
          </Link>
          <Link
            to="offers"
            className={
              activeLink === "/Accommodation/dashboard/offers" ? "active-link" : ""
            }
          >
            <i className="fas fa-clipboard-list"></i>
            <p>Offers</p>
          </Link>
          
          <div
            onClick={() => setShowLogoutConfirm(true)}
            className="logout-link"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Log Out</p>
          </div>
        </div>
      </div>

      <Outlet />

      {showLogoutConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button onClick={handleLogout} className="confirm-btn">
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="cancel-btn"
              >
                Cuncle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

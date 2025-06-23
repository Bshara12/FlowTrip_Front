import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DashBourd.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
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
            to="/Admin/dashbord/requist"
            className={
              activeLink === "/Admin/dashbord/requist" ? "active-link" : ""
            }
          >
            <i class="fas fa-clipboard-list"></i>
            <p>Requists</p>
          </Link>
          <Link
            to="/Admin/dashbord/packages"
            className={
              activeLink === "/Admin/dashbord/packages" ? "active-link" : ""
            }
          >
            <i class="fas fa-cubes"></i>

            <p>Packages</p>
          </Link>
          <Link
            to="/Admin/dashbord/owners"
            className={
              activeLink === "/Admin/dashbord/owners" ? "active-link" : ""
            }
          >
            <i class="fas fa-user-tie"></i>

            <p>Owners</p>
          </Link>

          <Link
            to="/Admin/dashbord/subadmin"
            className={
              activeLink === "/Admin/dashbord/subadmin" ? "active-link" : ""
            }
          >
            <i class="fas fa-chess-king"></i>

            <p>SubAdmin</p>
          </Link>

          <Link
            to="/Admin/dashbord/activity"
            className={
              activeLink === "/Admin/dashbord/activity" ? "active-link" : ""
            }
          >
            <i class="fas fa-running"></i>

            <p>Activitys</p>
          </Link>

          <Link
            to="/Admin/dashbord/catigory"
            className={
              activeLink === "/Admin/dashbord/catigory" ? "active-link" : ""
            }
          >
            <i class="fas fa-layer-group"></i> 
            <p>Catigory</p>
          </Link>

          {/* ********* */}

          <div
            onClick={() => window.open("https://wa.me/0938246910", "_blank")}
            className="logout-link"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-phone"></i>
            <p>Contact us</p>
          </div>

          {/* ////////// */}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ActivityFilter.css";
import useGeoLocation from "react-ipgeolocation";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Loading from "../Component/Loader";

countries.registerLocale(enLocale);

export default function ActivityFilter() {
  const [activities, setActivities] = useState([]);
  const [data, setData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useGeoLocation();
  const countryName = location.country
    ? countries.getName(location.country, "en")
    : "";

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/GetAllActivities"
        );
        setActivities(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/filterActivities",
        {
          activity_name: selectedActivity,
          country_name: countryName,
          location: searchTerm,
        }
      );
      setData(response.data.data);
    } catch (e) {
      console.log("Error: " + e);
    } finally {
      setIsLoading(false);
    }
  };

  const ActivityCard = ({ activity }) => (
    <div className="activity-card">
      <div className="activity-image">
        <img 
          src={activity.picture || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={activity.activity_name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="activity-content">
        <h3 className="activity-title">{activity.activity_name}</h3>
        <div className="activity-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{activity.location}</span>
        </div>
        <div className="activity-country">
          <i className="fas fa-globe"></i>
          <span>{activity.country_name}</span>
        </div>
        <div className="activity-contact">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href={`mailto:${activity.email}`}>{activity.email}</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <a href={`tel:${activity.phone_number}`}>{activity.phone_number}</a>
          </div>
        </div>
        {activity.description && (
          <p className="activity-description">{activity.description}</p>
        )}
      </div>
    </div>
  );

  return isLoading ? (
    <Loading />
  ) : (
    <div className="activity-filter-container">
      <div className="activity-filter-row">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <div className="owner-menu country-menu">
            <div className="owner-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>{selectedActivity || "All Activities"}</span>
                <svg
                  viewBox="0 0 360 360"
                  xml="space"
                  className="dropdown-arrow"
                >
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="XMLID_225_"
                      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    />
                  </g>
                </svg>
              </a>
              <div className="owner-submenu">
                <div className="owner-submenu-item">
                  <a
                    href="#"
                    className="owner-submenu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedActivity("");
                    }}
                  >
                    All Activities
                  </a>
                </div>
                {activities && activities.map((activity) => (
                  <div className="owner-submenu-item" key={`activity-${activity.id}`}>
                      <a
                        href="#"
                        className="owner-submenu-link"
                        onClick={async (e) => {
                          e.preventDefault();
                          setSelectedActivity(activity.name);
                        }}
                      >
                        {activity.name}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div
            className="room-details-inputbox"
            style={{ width: "fit-content", margin: "0" }}
          >
            <input
              required="required"
              placeholder=""
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span>Location (Optinal)</span>
            <i></i>
          </div>
        </div>

        <button className="owner-search-button" onClick={handleSearch}>
          <svg viewBox="0 0 512 512" className="svgIcon">
            <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79 45.5-127C450.8 96.5 354.3 0 225.4 0S0 96.5 0 216.1s96.5 216.1 216.1 216.1c48 0 92.1-17.1 127-45.5l99.7 99.7c4.5 4.5 10.6 7 17 7s12.5-2.5 17-7c9.4-9.4 9.4-24.6 0-34zM216.1 392.2c-97.2 0-176.1-78.9-176.1-176.1S118.9 39.9 216.1 39.9s176.1 78.9 176.1 176.1-78.9 176.1-176.1 176.1z" />
          </svg>
        </button>
      </div>

      <div className="activity-results">
        {data && data.length > 0 ? (
          data.map((activity, index) => (
            <ActivityCard key={`activity-${index}`} activity={activity} />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>No activities found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

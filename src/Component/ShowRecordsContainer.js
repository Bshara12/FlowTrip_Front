import SearchInput from "./SearchInput";
import "./ShowRecordsContainer.css";
import { useNavigate } from "react-router-dom";
import AddButton from "./AddButton";
import Loader from "../Component/Loader";
import { useState } from "react";
import Radio from "../Component/RadioButton";

const ShowRecordsContainer = ({
  loading,
  error,
  userType,
  showRoomDetails,
  selectedRoom,
  rooms = [],
  records = [],
  roomRecords = [],
  handleRoomClick,
  handleBackToRooms,
  searchQuery,
  handleInputChange,
  handleSearch,
  customTitle,
  customButtonText,
  addRoom,
  btnn,
  view,
  setView,
}) => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );
  }

  if (showRoomDetails && selectedRoom) {
    return (
      <div className="show-records-container">
        <div className="show-records-header-section">
          <div className="show-records-header-left">
            <button className="cta" onClick={handleBackToRooms}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hover-underline-animation">Back</span>
            </button>
            <h1 className="show-records-main-title">Room {selectedRoom.id} Archieve</h1>
          </div>
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{roomRecords.length || 0}</span>
              <span className="stat-label">Total Booking</span>
            </div>
          </div>
        </div>
        <div className="search-section">
          <SearchInput
            value={searchQuery}
            onChange={handleInputChange}
            onSearch={handleSearch}
            placeholder="search.."
          />
        </div>
        {!Array.isArray(roomRecords) || roomRecords.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>There is no Booking in this room</h3>
          </div>
        ) : (
          <div className="records-grid">
            {roomRecords.map((record) => (
              <div key={record.id} className="record-card">
                <div className="show-records-card-header">
                  <div className="show-records-user-avatar">
                    {record.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{record.user.name}</h3>
                    <p className="user-email">{record.user.email}</p>
                  </div>
                </div>
                <div className="show-records-card-content">
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">Customer name:</span>
                      <span className="info-value">{record.traveler_name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">National number:</span>
                      <span className="info-value">
                        {record.national_number}
                      </span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">Booking date:</span>
                      <span className="info-value date-value">
                        {record.start_date}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Leaving Date:</span>
                      <span className="info-value date-value">
                        {record.end_date}
                      </span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">Phone number:</span>
                      <span className="info-value">
                        {record.user.phone_number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (userType === "Hotel") {
    return (
      <div className="show-records-container">
        <div className="show-records-header-section">
          {addRoom == true ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "115px",
              }}
            >
              <h1 className="show-records-main-title">{customTitle || "Room Management"}</h1>
              <AddButton
                text="Add Room"
                onClick={() => navigate("/add-room")}
              />
            </div>
          ) : (
            <h1 className="show-records-main-title">{customTitle || "Room Management"}</h1>
          )}
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{rooms.length}</span>
              <span className="stat-label">Total Rooms</span>
            </div>
          </div>
        </div>
        {btnn && <Radio view={view} setView={setView} />}
        {rooms.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏨</div>
            <h3>There is no rooms in your Hotel</h3>
          </div>
        ) : (
          <div className="records-grid">
            {rooms.map((room) => (
              <div key={room.id} className="record-card">
                <div className="show-records-card-header">
                  <div className="show-records-user-avatar">🏨</div>
                  <div className="user-info">
                    <h3 className="user-name">Room number: {room.id}</h3>
                  </div>
                </div>
                <div className="show-records-card-content">
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">Price:</span>
                      <span className="info-value">
                        {room.offer_price > 0 ? (
                          <span>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "red",
                                marginRight: "8px",
                              }}
                            >
                              ${room.price}
                            </span>
                            <span
                              style={{ color: "#10B981", fontWeight: "bold" }}
                            >
                              ${room.offer_price}
                            </span>
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "var(--color2)",
                              fontWeight: "bold",
                            }}
                          >
                            ${room.price}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Persones:</span>
                      <span className="info-value">{room.people_count}</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">Space:</span>
                      <span className="info-value">{room.area} m²</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">description:</span>
                      <span className="info-value description-text">
                        {room.description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="show-records-card-footer">
                  <button
                    className="action-btn primary"
                    onClick={
                      customButtonText === "Details"
                        ? () => navigate(`/room-details/${room.id}`)
                        : () => handleRoomClick(room.id)
                    }
                  >
                    {customButtonText || "Archieve"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 2. الواجهة الأولى: قائمة الأشهر
  if (!selectedMonth) {
    return (
      <div className="show-records-container">
        <div className="show-records-header-section">
          <h1 className="show-records-main-title">Booking Archive</h1>
        </div>

        {btnn && <Radio view={view} setView={setView} />}

        {records.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>There is no Booking yet</h3>
          </div>
        ) : (
          <div className="records-grid">
            {records.map((m) => (
              <div
                key={m.month}
                className="record-card"
                onClick={() => setSelectedMonth(m)}
              >
                <div className="show-records-card-header">
                  <h3>{m.month}</h3>
                </div>
                <div className="show-records-card-content">
                  <p>Total Booking: {m.count}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="show-records-container">
      <div className="show-records-header-section">
        <button className="cta" onClick={() => setSelectedMonth(null)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hover-underline-animation">Back</span>
        </button>
        <h1 className="show-records-main-title">{selectedMonth.month}</h1>
      </div>

      {selectedMonth.items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>There is no Booking in this month</h3>
        </div>
      ) : (
        <div className="records-grid">
          {selectedMonth.items.map((item) => (
            <div key={item.id} className="record-card">
              <div className="show-records-card-content">
                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">Customer name:</span>
                    <span className="info-value">{item.traveler_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">National number:</span>
                    <span className="info-value">{item.national_number}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">Start Booking:</span>
                    <span className="info-value">{item.start_date}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">End Booking:</span>
                    <span className="info-value">{item.end_date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowRecordsContainer;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowRecordsContainer from "../Component/ShowRecordsContainer";

export default function ShowRecords() {
  const [records, setRecords] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomRecords, setRoomRecords] = useState([]);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalRecords, setOriginalRecords] = useState([]);
  const [originalRoomRecords, setOriginalRoomRecords] = useState([]);

  var token = "GHH0Sf9hfdAIATLklXEqPAEYpBHeYmugKTn9w5mWf1ecbdb6";

  useEffect(() => {
    const checkUserType = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/WhoAmI", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserType(response.data.data.type);
        if (response.data.data.type === "Hotel") {
          await fetchRoomsData();
        } else {
          await fetchBookingRecords();
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error(err);
      }
    };
    checkUserType();
  }, []);

  const fetchRoomsData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/ShowAccommodationRecords",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data.rooms);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const fetchBookingRecords = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/ShowAccommodationRecords",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(response.data.details);
      setOriginalRecords(response.data.details);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const handleRoomClick = async (roomId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/ShowRoomRecords/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedRoom(rooms.find((room) => room.id === roomId));
      setRoomRecords(response.data);
      setOriginalRoomRecords(response.data);
      setShowRoomDetails(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(err);
    }
  };

  const handleBackToRooms = () => {
    setShowRoomDetails(false);
    setSelectedRoom(null);
    setRoomRecords([]);
    setOriginalRoomRecords([]);
    setSearchQuery("");
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      if (userType === "Hotel" && showRoomDetails) {
        setRoomRecords(originalRoomRecords);
      } else if (userType !== "Hotel") {
        setRecords(originalRecords);
      }
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/FilterNameAccommodation",
        {
          name: query,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let filteredData = [];
      if (
        response.data &&
        response.data.filtered_users &&
        Array.isArray(response.data.filtered_users)
      ) {
        filteredData = response.data.filtered_users;
      } else if (response.data && Array.isArray(response.data)) {
        filteredData = response.data;
      } else if (
        response.data &&
        response.data.details &&
        Array.isArray(response.data.details)
      ) {
        filteredData = response.data.details;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        filteredData = response.data.data;
      }
      if (userType === "Hotel" && showRoomDetails) {
        const filteredRoomRecords = originalRoomRecords.filter((record) =>
          filteredData.some((user) => user.id === record.user.id)
        );
        setRoomRecords(filteredRoomRecords);
      } else if (userType !== "Hotel") {
        const filteredBookingRecords = originalRecords.filter((record) =>
          filteredData.some((user) => user.id === record.user.id)
        );
        setRecords(filteredBookingRecords);
      }
    } catch (err) {
      console.error("Error filtering records:", err);
      if (userType === "Hotel" && showRoomDetails) {
        const filtered = originalRoomRecords.filter(
          (record) =>
            record.user?.name?.toLowerCase().includes(query.toLowerCase()) ||
            record.traveler_name?.toLowerCase().includes(query.toLowerCase())
        );
        setRoomRecords(filtered);
      } else if (userType !== "Hotel") {
        const filtered = originalRecords.filter(
          (record) =>
            record.user?.name?.toLowerCase().includes(query.toLowerCase()) ||
            record.traveler_name?.toLowerCase().includes(query.toLowerCase())
        );
        setRecords(filtered);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <ShowRecordsContainer
      loading={loading}
      error={error}
      userType={userType}
      showRoomDetails={showRoomDetails}
      selectedRoom={selectedRoom}
      rooms={rooms}
      records={records}
      roomRecords={roomRecords}
      handleRoomClick={handleRoomClick}
      handleBackToRooms={handleBackToRooms}
      searchQuery={searchQuery}
      handleInputChange={handleInputChange}
      handleSearch={handleSearch}
      customTitle="Booking Archieve"
    />
  );
}

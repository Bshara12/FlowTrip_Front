import axios from "axios";
import { useEffect, useState } from "react";
import ShowRecordsContainer from "../Component/ShowRecordsContainer";


export default function RoomsHome() {
  var token = "bOJYVAykGuPS02EwMu3KndnhrJ2Ff6t6yMP1uE9O68ab63f0";
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/ShowAllRooms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError("Failed to load rooms data");
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  return (
    <ShowRecordsContainer
      loading={loading}
      error={error}
      userType="Hotel"
      rooms={rooms}
      records={[]}
      roomRecords={[]}
      showRoomDetails={false}
      selectedRoom={null}
      handleRoomClick={() => {}}
      handleBackToRooms={() => {}}
      searchQuery=""
      handleInputChange={() => {}}
      handleSearch={() => {}}
      customButtonText="Details"
      addRoom={true}
    />
  );
}

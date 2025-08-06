import axios from "axios";
import { useEffect, useState } from "react";
import ShowRecordsContainer from "../Component/ShowRecordsContainer";
import { baseURL, SHOW_ALL_ROOMS, TOKEN } from "../Api/Api";

export default function RoomsHome() {
<<<<<<< HEAD
  var token = "bOJYVAykGuPS02EwMu3KndnhrJ2Ff6t6yMP1uE9O68ab63f0";
=======
  var token = TOKEN;
>>>>>>> 192ae829312c3ed5f9f2dd98cd4963df58110318
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/${SHOW_ALL_ROOMS}`,
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

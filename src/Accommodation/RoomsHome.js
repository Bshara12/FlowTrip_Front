import axios from "axios";
import { useEffect, useState } from "react";
import ShowRecordsContainer from "../Component/ShowRecordsContainer";

export default function RoomsHome(){
  
  var token = 'TJg51Xpxh1jmZ7AVMnIAXUuK5PqDZs5nANiqbyKza74a74b3'
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async() => {
      try{
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/ShowAllRooms', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log(response.data.data);
        setRooms(response.data.data);
        setLoading(false);
      }
      catch(e){
        console.log(e);
        setError('Failed to load rooms data');
        setLoading(false);
      }
    }
    getRooms();
  },[]);

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
    />
  );
}
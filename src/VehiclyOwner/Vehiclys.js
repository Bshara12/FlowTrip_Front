import React, { useEffect, useState } from "react";
import "./Vehiclys.css";
import axios from "axios";
import VehicleCard from "../Component/VehicleCard";
import { useNavigate } from "react-router-dom";
import Button from "../Component/AddButton";

const Vehiclys = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const userId = 7;
  const token = "2|XiOK7khnh4qRbcThf9jLcrn4KMLtdH8EPzWRHeQSad1bea29";

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/vehicleowner/getAllViclyForuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        const allVehicles = res.data.data;
        const uniqueVehiclesMap = new Map();
        allVehicles.forEach((vehicle) => {
          if (!uniqueVehiclesMap.has(vehicle.vehicle_id)) {
            uniqueVehiclesMap.set(vehicle.vehicle_id, vehicle);
          }
        });
        const uniqueVehicles = Array.from(uniqueVehiclesMap.values());
        setVehicles(uniqueVehicles);
      })
      .catch((err) => {
        console.error("An error occurred while fetching data:", err);
      });
  }, []);

  return (
    <div className="vehicle-container">
      <div className="vehicle-header">
        <h2 className="vehicle-title">Your Vehiclys</h2>
        <Button onClick={() => navigate("/create-vehicle")}>+ Add vehicle</Button>
      </div>

      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle}  onClick={() => navigate(`/vehicle/${vehicle.vehicle_id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Vehiclys;

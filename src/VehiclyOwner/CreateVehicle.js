import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./CreateVehicle.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateVehicle = () => {
  const [carTypes, setCarTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    people_count: "",
    car_type_id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const carTypeIdFromStep1 = location?.state?.carTypeId;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/GetAllCarTypes")
      .then((res) => {
        if (Array.isArray(res.data.car_types)) {
          setCarTypes(res.data.car_types);
        } else {
          setCarTypes([]);
          console.warn("Unexpected data format from API");
        }
      })
      .catch((err) => {
        console.error("Error fetching car types:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const token = "2|XiOK7khnh4qRbcThf9jLcrn4KMLtdH8EPzWRHeQSad1bea29";
  if (!token) {
    toast.error("Authentication token not found.");
    return;
  }

  const payload = {
    name: formData.name,
    car_discription: formData.description,
    people_count: formData.people_count,
    car_type_id: formData.car_type_id,
  };

  axios
    .post("http://127.0.0.1:8000/api/vehicleowner/createVehicle", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const vehicleId = res.data?.vehicle?.id; 
      if (vehicleId) {
        toast.success("Vehicle created successfully!");
        setTimeout(() => {
          navigate(`/vehicle/add-images/${vehicleId}`);
        }, 1500);
      } else {
        toast.error("Vehicle created, but couldn't get ID.");
      }
    })
    .catch((err) => {
      console.error("API Error:", err);
      toast.error("Failed to create vehicle.");
    });
};


  return (
    <div className="createcar-form-container">
      <form onSubmit={handleSubmit} className="createcar-vehicle-form">
        <h2 className="createcar-form-title">Add Vehicle Information</h2>

        <label htmlFor="name">Vehicle Name:</label>
        <div className="createcar-input-wrapper">
          <i className="fas fa-car-side createcar-icon"></i>
          <input
            type="text"
            name="name"
            placeholder="e.g. Hyundai Elantra"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="description">Vehicle Description:</label>
        <div className="createcar-input-wrapper">
          <i className="fas fa-align-left createcar-icon"></i>
          <textarea
            name="description"
            placeholder="Briefly describe the vehicle"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="people_count">People Capacity:</label>
        <div className="createcar-input-wrapper">
          <i className="fas fa-users createcar-icon"></i>
          <input
            type="number"
            name="people_count"
            placeholder="e.g. 5"
            value={formData.people_count}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="car_type_id">Vehicle Type:</label>
        <div className="createcar-input-wrapper">
          <i className="fas fa-list createcar-icon"></i>
          <select
            name="car_type_id"
            value={formData.car_type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select vehicle type</option>
            {carTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="createcar-submit-button">
          <i className="fas fa-save" style={{ marginInlineEnd: "8px" }}></i>
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateVehicle;

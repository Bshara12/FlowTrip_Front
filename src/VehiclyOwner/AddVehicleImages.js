import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./AddVehicleImages.css";

const AddVehicleImages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const token = "2|XiOK7khnh4qRbcThf9jLcrn4KMLtdH8EPzWRHeQSad1bea29";

useEffect(() => {
  axios
    .get(`http://127.0.0.1:8000/api/vehicleowner/getAllPicture/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setImages(res.data.images || []);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setImages([]);
      } else {
        toast.error("An error occurred while fetching images.");
      }
    });
}, [id]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("vehicle_id", id);
    formData.append("picture", file);

    axios
      .post(
        "http://127.0.0.1:8000/api/vehicleowner/createPictureCar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        toast.success("The image has been uploaded successfully");
        setTimeout(() => {
          axios
            .get(`http://127.0.0.1:8000/api/vehicleowner/getAllPicture/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setImages(res.data.images || []));
        }, 500);
      })
      .catch(() => {
        toast.error("Failed to upload image");
      });
  };

  return (
    <div className="addvehicle-container">
      <h2>Add vehicle photos</h2>

      <button
        className="addvehicle-upload-btn animated-button"
        onClick={() => fileInputRef.current.click()}
      >
        Select an image from the device
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="addvehicle-preview-images">
        {images.length === 0 ? (
          <p className="no-images-text">There are no photos currently</p>
        ) : (
          images.map((img) => (
            <img key={img.id} src={img.path} alt={`vehicle-${img.id}`} />
          ))
        )}
      </div>

      <div className="addvehicle-buttons">
        <button
          className="skip-btn animated-button"
          onClick={() => navigate("/VehiclyOwner/dashboard/vehiclys")}
        >
          Skipe
        </button>

        {images.length > 0 && (
          <button
            className="finish-btn animated-button"
            onClick={() => navigate("/VehiclyOwner/dashboard/vehiclys")}
          >
           Finish
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddVehicleImages;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRoom.css";
import axios from "axios";
import Loader from "../Component/Loader";


export default function AddRoom() {
  var token = "GHH0Sf9hfdAIATLklXEqPAEYpBHeYmugKTn9w5mWf1ecbdb6";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    room_number: "",
    price: "",
    people_count: "",
    area: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (images.length > 0) {
        const formDataToSend = new FormData();
        formDataToSend.append('price', formData.price);
        formDataToSend.append('area', formData.area);
        formDataToSend.append('people_count', formData.people_count);
        formDataToSend.append('room_number', formData.room_number);
        formDataToSend.append('description', formData.description);
        images.forEach((image) => {
          formDataToSend.append('images[]', image);
        });



        const response = await axios.post(
          "http://127.0.0.1:8000/api/AddRoom",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          console.log(response)
          navigate("/Accommodation/dashboard/rooms");
        } else {
          setError('Failed to add room');
        }
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/AddRoom",
          {
            price: formData.price,
            area: formData.area,
            people_count: formData.people_count,
            room_number: formData.room_number,
            description: formData.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status == 200) {
          navigate("/Accommodation/dashboard/rooms");
        } else {
          setError('Failed to add room');
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      room_number: "",
      price: "",
      people_count: "",
      area: "",
      description: "",
    });
    setImages([]);
    setError("");
  };

  return loading ? <Loader/> : (
    <div className="add-room-container">
      <div className="form-container">
        <div className="form">
          <span className="heading">Add New Room</span>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Room Number"
              type="number"
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              className="input"
              required
              min={1}
            />

            <input
              placeholder="Price ($)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="input"
              required
              min={1}
            />

            <input
              placeholder="Number of People"
              type="number"
              name="people_count"
              value={formData.people_count}
              onChange={handleInputChange}
              className="input"
              required
              min={1}
            />

            <input
              placeholder="Area (m²)"
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="input"
              required
              min={1}
            />

            <textarea
              placeholder="Room Description"
              rows="5"
              cols="30"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea"
              required
            />

            <div className="image-upload-section">
              <label htmlFor="image-upload" className="image-upload-label">
                Choose Images
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              {images.length > 0 && (
                <div className="selected-images">
                  <p>Selected {images.length} image(s)</p>
                  <div className="image-preview">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                        />
                        <span className="image-name">{image.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="button-container">
              <button type="submit" className="send-button" disabled={loading}>
                {loading ? "Adding..." : "Add Room"}
              </button>
              <div className="reset-button-container">
                <button
                  type="button"
                  onClick={handleReset}
                  className="reset-button"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryPopup.css";
import { toast } from "react-toastify";

const token = "1|lIqv1X1fZ4XjqQk9Wt7wDWYKoHqznzN1tNx92WJ6319fc32f";

const CategoryPopup = ({ onClose, requestId, onSuccessUpdate }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/GetAllOwnerCategories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.owners_categories || []);
      })
      .catch((err) => {
        toast.error(`Error:${err}`);
        toast.error("فشل في تحميل الكاتيغوري");
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleCategoryClick = async (name) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/EditRequest/${requestId}`,
        { activity_name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccessUpdate(name); 
      onClose(); 
    } catch (err) {
      console.error("Error updating request:", err);
      toast.error(`Error:${err}`);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Select a Category</h2>
        <div className="category-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className="popup-category-card category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <p><strong>ID:</strong> {category.id}</p>
              <p><strong>Name:</strong> {category.name}</p>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CategoryPopup;

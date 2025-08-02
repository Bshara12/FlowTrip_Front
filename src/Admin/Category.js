import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Category.css";
import Button from "../Component/AddButton";
import { ToastContainer, toast } from "react-toastify";
import CategoryCard from "../Component/CategoryCard";
import CategoryCard from "../Component/CategoryCard";
import { ToastContainer, toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const modalRef = useRef(null);

  const fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/api/GetAllOwnerCategories")
      .then((response) => {
        const fetched = response.data.owners_categories.map((cat) => ({
          id: cat.id,
          text: cat.name,
        }));
        setCategories(fetched);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") {
      toast.error("Please enter the category name.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/addcatigory", {
        name: newCategoryName,
      },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +"G3SNaKPlCWuy2mAbgxSgpq7zz8BaVh2w7oSsRuxwec6795ec"
            }
      })
      .then(() => {
        toast.success("Category added successfully");
        setNewCategoryName("");
        setShowModal(false);
        fetchCategories();
      })
      .catch((error) => {
        toast.error(`Error:${error.message}`);
        console.log(error.message)
      });
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="category-page">
      <ToastContainer />

      <div className="category-header">
        <Button onClick={handleAddClick} text="Add Category" />
      </div>

      <div className="category-row">
        {categories.map((cat) => (
          <CategoryCard
            title={cat.text}
            key={cat.id}
            id={cat.id}
            text={cat.text}
            onDelete={() => handleDelete(cat.id)}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>Add a new category</h2>
            <input
              type="text"
              placeholder="Enter the category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="animated-btn" onClick={handleAddCategory}>
                Add
              </button>
              <button className="animated-btn cancel" onClick={() => setShowModal(false)}>
                cansle
              </button>
              <button
  type="button"
  className="animated-btn cancel"
  onClick={() => setShowModal(false)}
>
  إلغاء
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;

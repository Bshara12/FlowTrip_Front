import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Activity.css";
import Button from "../Component/AddButton";
import ActivityCard from "../Component/ActivityCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Component/Loader";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newActivityName, setNewActivityName] = useState("");
  const [confirmDeleteData, setConfirmDeleteData] = useState(null); // <-- بدل ID
  const modalRef = useRef(null);

  const token = "G3SNaKPlCWuy2mAbgxSgpq7zz8BaVh2w7oSsRuxwec6795ec";

  const fetchActivities = () => {
    axios
      .get("http://127.0.0.1:8000/api/getAllActivity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetched = response.data.data.map((act) => ({
          id: act.id,
          text: act.name,
        }));
        setActivities(fetched);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = (id, name) => {
    setConfirmDeleteData({ id, name });
  };

  const confirmDelete = () => {
    const { id, name } = confirmDeleteData;
    axios
      .delete(`http://127.0.0.1:8000/api/deleteactivity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("deleted Successfully");
        setActivities((prev) => prev.filter((act) => act.id !== id));
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      })
      .finally(() => {
        setConfirmDeleteData(null);
      });
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleAddActivity = () => {
    if (newActivityName.trim() === "") {
      toast.error("Enter activity name");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/addActivity",
        { name: newActivityName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + "1|lIqv1X1fZ4XjqQk9Wt7wDWYKoHqznzN1tNx92WJ6319fc32f",
          },
        }
      )
      .then(() => {
        toast.success("Success");
        setNewActivityName("");
        setShowModal(false);
        fetchActivities();
      })
      .catch((error) => {
        toast.error(`${error.message}`);
        console.log(error.message);
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
    <div className="activity-page">
      <ToastContainer />

      <div className="activity-header">
        <Button onClick={handleAddClick} text="Add Activity" />
      </div>

      <div className="activity-row">
        {activities.map((act) => (
          <ActivityCard
            key={act.id}
            id={act.id}
            text={act.text}
            onDelete={() => handleDelete(act.id, act.text)} 
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>Add a new activity</h2>
            <input
              type="text"
              placeholder="Enter the activity name"
              value={newActivityName}
              onChange={(e) => setNewActivityName(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="animated-btn" onClick={handleAddActivity}>
                Add
              </button>
              <button
                className="animated-btn cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteData !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm deletion</h2>
            <p style={{ marginBottom:"15px" }}>Are you sure you want to delete the activity: "{confirmDeleteData.name}"?</p>
            <div className="modal-buttons">
              <button className="animated-btn" onClick={confirmDelete}>
                Yes, delete
              </button>
              <button
                className="animated-btn cancel"
                onClick={() => setConfirmDeleteData(null)}
              >
                cancell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;

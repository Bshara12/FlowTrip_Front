// RequestDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RequistDetails.css";
import Button from "./Buttonconferm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ConfirmDialog from "./ConfirmDialog";
import CategoryPopup from "../Admin/CategoryPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token = "uvf6ZqmOHc6e0IACOS91WQkulsmC72r1elnRBph5c033a8a7";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/ShowRequest/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.data) {
          setRequest(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load order details.");
        console.error("Error fetching request details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/AcceptRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order confirmed successfully");
      setTimeout(() => navigate("/Admin/dashbord/requist"), 1500);
    } catch (error) {
      console.error("Error confirming request:", error);
      toast.error("Failed to confirm the order.");
    }
  };

  const handleActivityUpdate = (newActivity) => {
    setRequest((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        activity_name: newActivity,
      },
    }));
    toast.success("The activity has been updated successfully");
  };

  const handleDelete = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/DeleteRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("The request has been successfully deleted");
      setTimeout(() => navigate("/Admin/dashbord/requist"), 1500);
    } catch (err) {
      console.error("Error deleting request:", err);
      toast.error("Failed to delete request.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!request) return <p className="error">Failed to load data.</p>;

  const { request: req, user_name, email, phone_number } = request;

  return (
    <div className="request-details-container">
      <div className="request-details-card">
        <h1 className="request-title">{req.business_name}</h1>

        <section className="request-section">
          <h3 className="section-title">Owner Information</h3>
          <p className="section-text">Name: {user_name}</p>
          <p className="section-text">Email: {email}</p>
          <p className="section-text">Phone: {phone_number}</p>
        </section>

        <section className="request-section">
          <h3 className="section-title">Request Details</h3>
          <p><strong className="field-label">Description:</strong> {req.description}</p>
          <p><strong className="field-label">Location:</strong> {req.location}</p>
          <p><strong className="field-label">Category:</strong> {req.owner_category_id}</p>
          <p><strong className="field-label">Activity:</strong> {req.activity_name || "Not specified"}</p>
          <p><strong className="field-label">Accommodation:</strong> {req.accommodation_type || "Not specified"}</p>
        </section>

        <div className="buttons-group">
          <Button onClick={handleConfirm} />
          <div onClick={() => setShowCategoryPopup(true)}>
            <EditButton />
          </div>
          <div onClick={() => setShowDeleteConfirm(true)}>
            <DeleteButton />
          </div>
        </div>

        <button className="back-button" onClick={() => window.history.back()}>
          Back to Requests
        </button>
      </div>

      {showCategoryPopup && (
        <CategoryPopup
          onClose={() => setShowCategoryPopup(false)}
          requestId={id}
          onSuccessUpdate={handleActivityUpdate}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this request?"
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDelete();
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RequestDetails;

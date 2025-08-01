import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlanDetails.css";
import DeleteButton from "../Component/DeleteButton";
import EditButton from "../Component/EditButton"; 


export default function PlanDetails() {
  const { planeId } = useParams();
  const navigate = useNavigate();
  const [planeData, setPlaneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchPlaneDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/GetSinglePlane/${planeId}`, {
          headers: {
            'Authorization': 'Bearer 2|P4Zp6bOi9PKDtm35p3EpvdVepF8l1XIFdfPkJTQP409bd132'
          }
        });
        setPlaneData(response.data);
      } catch (error) {
        console.error("Failed to fetch plane details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaneDetails();
  }, [planeId]);

  const handleDelete = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/DeletePlane/${planeId}`, {
        headers: {
          Authorization: "Bearer 2|P4Zp6bOi9PKDtm35p3EpvdVepF8l1XIFdfPkJTQP409bd132",
        },
      });

      if (response.data?.message === "your plane deleted successfully") {
        setShowConfirmDelete(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate("/plans/showallplans");
        }, 2000);
      } else {
        console.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting plane:", error);
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading plane details...</div>;
  }

  if (!planeData) {
    return <div className="error-message">Plane details not found.</div>;
  }

  const { plane, plane_type, image_url } = planeData;

  return (
    <div className="plan-details-container">
      <div className="plan-card">
        <div className="image-section">
          <img src={image_url} alt={`${plane_type} Diagram`} />
        </div>
        <div className="info-section">
          <h2>{plane_type}</h2>
          <p><strong>Seats Count:</strong> {plane.seats_count}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`status-badge ${
              plane.status.toLowerCase().includes('available') ? 'available-for-now' : 'not-available'
            }`}>
              {plane.status}
            </span>
          </p>

          <div className="action-buttons">
  <div onClick={() => navigate(`/plans/edit/${planeId}`)}>
    <EditButton />
  </div>

  <div onClick={() => setShowConfirmDelete(true)}>
    <DeleteButton />
  </div>
</div>

        </div>
      </div>

      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>هل أنت متأكد أنك تريد حذف هذه الطائرة؟</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDelete}>نعم، احذف</button>
              <button className="cancel-btn" onClick={() => setShowConfirmDelete(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box success">
            <p>✅ تم حذف الطائرة بنجاح</p>
          </div>
        </div>
      )}
    </div>
  );
}

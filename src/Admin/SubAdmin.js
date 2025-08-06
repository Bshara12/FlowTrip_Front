import axios from "axios";
import { useEffect, useState } from "react";
import SubAdminCard from "../Component/SubAdminCard";
import ConfirmDialog from "../Component/ConfirmDialog";
import "./OwnerSearch.css";
import Loader from "../Component/Loader";


export default function SubAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = "yPlMu9DzUniMPPQSqt81DD2YMmSv1zhX7RMGS74i6b055edd";

  useEffect(() => {
    const loadInfo = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/getAllSubAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    loadInfo();
  }, []);

  const handleRemoveSubAdmin = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmDialog(true);
  };

  const removeSubAdmin = async () => {
    try {
      setLoading(true);
      await axios.get(`http://127.0.0.1:8000/api/removeSubAdmin/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const res = await axios.get("http://127.0.0.1:8000/api/getAllSubAdmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Error removing sub admin:", err);
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
      setSelectedUserId(null);
    }
  };

  const cancelRemove = () => {
    setShowConfirmDialog(false);
    setSelectedUserId(null);
  };

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <div className="owner-error">{error}</div>;
  }

  return (
    <div className="fs">
      <div className="owner-list-container">
        {users.map((item, idx) => (
          <SubAdminCard
            key={item.id}
            name={item.name}
            email={item.email}
            phoneNumber={item.phone_number}
            style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            onClick={() => handleRemoveSubAdmin(item.id)}
            buttonText="Remove SubAdmin"
          />
        ))}
      </div>

              {showConfirmDialog && (
          <ConfirmDialog
            message="Do you want to make this user as normal user?"
            onConfirm={removeSubAdmin}
            onCancel={cancelRemove}
            color="true"
          />
        )}
    </div>
  );
}

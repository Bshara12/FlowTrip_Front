import axios from "axios";
import { useEffect, useState } from "react";
import SubAdminCard from "../Component/SubAdminCard";
import ConfirmDialog from "../Component/ConfirmDialog";
import "./OwnerSearch.css";

export default function SubAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = "8izVrtthWL2vU0kXrWV1w4wWqT9JT2z3M1gKY0hlfe25f76e";

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
          setError("حدث خطأ أثناء جلب البيانات");
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setUsers([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/filterusers",
        {
          'name' : search
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError("حدث خطأ أثناء البحث");
    } finally {
      setLoading(false);
    }
  };

  const reloadAllUsers = async (clearCountry = false, clearCategory = false) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/getalluser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      }
    catch (err) {
      setError("حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="owner-loading">Loading...</div>;
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

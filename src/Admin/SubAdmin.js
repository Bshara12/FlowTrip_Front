import axios from "axios";
import { useEffect, useState } from "react";
import SubAdminCard from "../Component/SubAdminCard";
import ConfirmDialog from "../Component/ConfirmDialog";
import "./OwnerSearch.css";
import Loader from "../Component/Loader";
import { baseURL, FILTER_USERS, GET_ALL_SUBADMIN, GET_ALL_UESER, REMOVE_SUBADMIN, TOKEN } from "../Api/Api";


export default function SubAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = TOKEN;

  useEffect(() => {
    const loadInfo = async () => {
      await axios
        .get(`${baseURL}/${GET_ALL_SUBADMIN}`, {
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
      await axios.get(`${baseURL}/${REMOVE_SUBADMIN}/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const res = await axios.get(`${baseURL}/${GET_ALL_SUBADMIN}`, {
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
        `${baseURL}/${FILTER_USERS}`,
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
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reloadAllUsers = async (clearCountry = false, clearCategory = false) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.get(`${baseURL}/${GET_ALL_UESER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      }
    catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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

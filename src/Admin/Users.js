import axios from "axios";
import { useEffect, useState } from "react";
import SubAdminCard from "../Component/SubAdminCard";
import ConfirmDialog from "../Component/ConfirmDialog";
import "./OwnerSearch.css";

export default function Users() {
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
        .get("http://127.0.0.1:8000/api/getalluser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data)
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

  const handleCreateSubAdmin = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmDialog(true);
  };

  const createSubAdmin = async () => {
    try {
      setLoading(true);
      await axios.get(`http://127.0.0.1:8000/api/createSubAdmin/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const res = await axios.get("http://127.0.0.1:8000/api/getalluser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Error creating sub admin:", err);
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
      setSelectedUserId(null);
    }
  };

  const cancelCreate = () => {
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
      <div className="flex">
        <div className="search-bar-modern">
          <div className="input-container">
            <input
              placeholder="Enter name.."
              type="text"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                if (value === "") {
                  reloadAllUsers();
                }
              }}
            />
          </div>
          <button className="button" onClick={handleSearch}>
            <svg viewBox="0 0 512 512" className="svgIcon">
              <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79 45.5-127C450.8 96.5 354.3 0 225.4 0S0 96.5 0 216.1s96.5 216.1 216.1 216.1c48 0 92.1-17.1 127-45.5l99.7 99.7c4.5 4.5 10.6 7 17 7s12.5-2.5 17-7c9.4-9.4 9.4-24.6 0-34zM216.1 392.2c-97.2 0-176.1-78.9-176.1-176.1S118.9 39.9 216.1 39.9s176.1 78.9 176.1 176.1-78.9 176.1-176.1 176.1z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="owner-list-container">
        {users.map((item, idx) => (
          <SubAdminCard
            key={item.id}
            name={item.name}
            email={item.email}
            phoneNumber={item.phone_number}
            style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            onClick={() => handleCreateSubAdmin(item.id)}
            buttonText="Make SubAdmin"
          />
        ))}
      </div>

              {showConfirmDialog && (
          <ConfirmDialog
            message="Do you want to make this user as SubAdmin?"
            color="true"
            onConfirm={createSubAdmin}
            onCancel={cancelCreate}
          />
        )}
    </div>
  );
}

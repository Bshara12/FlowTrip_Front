import axios from "axios";
import { useEffect, useState } from "react";
import "./Owner.css";

export default function Owner() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "uvf6ZqmOHc6e0IACOS91WQkulsmC72r1elnRBph5c033a8a7"; // ⚠️ غيّر هذا لاحقًا حسب طريقة المصادقة لديك

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/GetAllOwners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOwners(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="owner-loading">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="owner-error">{error}</div>;
  }

  return (
    <div className="owner-list-container">
      {owners.map((item) => (
        <div className="card" key={item.owner.id}>
          <div className="card-image"></div>
          <div className="card-description">
            <p className="text-title">{item.user.name}</p>
            <p className="text-body">
              <span className="info-row">
                <span className="info-icon">📍</span>
                <span className="info-label">Location:</span>
                <span className="info-value">{item.owner.location}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">☎️</span>
                <span className="info-label">Number:</span>
                <span className="info-value">{item.user.phone_number}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">🏷️</span>
                <span className="info-label">Category:</span>
                <span className="info-value">{item.category}</span>
              </span>
            </p>
          </div>
          <div className="card-review">Review</div>
        </div>
      ))}
    </div>
  );
}
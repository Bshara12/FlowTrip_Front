import axios from "axios";
import { useState, useEffect } from "react";
import "./ShowRecords.css";

export default function ShowRecords(){
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  var token = 'NYSAf4ryQT18IPkGxtbRGXRM28CIKN0rBZMmdela92fdd6fa';

  useEffect(() => {
    const getRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/ShowAccommodationRecords', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecords(response.data.details);
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ في تحميل البيانات');
        setLoading(false);
        console.error(err);
      }
    }
    
    getRecords();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day}, ${month}, ${year}`;
  };

  const getStatusColor = (status) => {
    return status === 0 ? '#10B981' : '#EF4444';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="show-records-container">
      <div className="header-section">
        <h1 className="main-title">Booking Archieve</h1>
        <div className="stats-card">
          <div className="stat-item">
            <span className="stat-number">{records.length}</span>
            <span className="stat-label">Total Booking</span>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>There is no booking yet</h3>
        </div>
      ) : (
        <div className="records-grid">
          {records.map((record) => (
            <div key={record.id} className="record-card">
              <div className="card-header">
                <div className="user-avatar">
                  {record.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h3 className="user-name">{record.user.name}</h3>
                  <p className="user-email">{record.user.email}</p>
                </div>
              </div>

              <div className="card-content">
                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">Customer name:</span>
                    <span className="info-value">{record.traveler_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Natinal number:</span>
                    <span className="info-value">{record.national_number}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">Booking date:</span>
                    <span className="info-value date-value">{formatDate(record.start_date)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Leaving daate:</span>
                    <span className="info-value date-value">{formatDate(record.end_date)}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <span className="info-label">Phone number:</span>
                    <span className="info-value">{record.user.phone_number}</span>
                  </div>
                </div>
              </div>

              {/* <div className="card-footer">
                <button className="action-btn primary">عرض التفاصيل</button>
                <button className="action-btn secondary">تعديل</button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
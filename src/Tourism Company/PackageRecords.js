import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./PackageRecords.css";

export default function PackageRecords() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError("");
      try {
        const token = Cookies.get("authToken") || localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/tourism/getrecordsforpackage/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const statusFlag = res?.data?.status;
        const apiMessage = res?.data?.message;
        if (statusFlag && statusFlag !== "success") {
          setError(apiMessage || "تعذر جلب سجلات هذه الحزمة.");
          setRecords([]);
        } else {
          const data = res?.data?.data ?? [];
          setRecords(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        const apiMessage = e?.response?.data?.message;
        const finalMessage = apiMessage || e?.message || "تعذر جلب سجلات هذه الحزمة.";
        setError(finalMessage);
        console.error("Fetch package records failed", {
          statusCode: e?.response?.status,
          statusText: e?.response?.data?.status || e?.response?.statusText,
          message: apiMessage || e?.message,
          data: e?.response?.data,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [id]);

  const hasData = useMemo(() => (records?.length ?? 0) > 0, [records]);

  return (
    <div className="package-records-page">
      <div className="package-records-header">
        <h2>سجلات البكج #{id}</h2>
      </div>

      {loading && <p className="loading">جاري التحميل...</p>}
      {!loading && error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="recordsList">
          {!hasData && <div className="empty">لا توجد سجلات لهذه الحزمة.</div>}
          {hasData &&
            records.map((rec, idx) => (
              <div key={idx} className="recordRowCard">
                <div className="avatarCircle" aria-hidden>
                  {(rec.traveler_name || "?").toString()[0]?.toUpperCase() || "?"}
                </div>
                <div className="recordInfo">
                  <div className="topLine">
                    <span className="primaryName">
                      {rec.user_name || "—"}
                    </span>
                  </div>
                  <div className="subLine">
                    {rec.national_number && (
                      <span className="pill pill-id">
                        national number: {rec.national_number}
                      </span>
                    )}
                    {rec.user_name && (
                      <span className="pill pill-username">
                        travel name: {rec.traveler_name}
                      </span>
                    )}
                    {rec.email && (
                      <span className="pill pill-email">{rec.email}</span>
                    )}
                    {rec.phone_number && (
                      <span className="pill pill-phone">{rec.phone_number}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../Component/RequestCard";

const Requist = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = "1|lIqv1X1fZ4XjqQk9Wt7wDWYKoHqznzN1tNx92WJ6319fc32f"; // ⚠️ غيّر هذا لاحقًا حسب طريقة المصادقة لديك

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/GetAllRequests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data) {
          setRequests(response.data.data);
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الطلبات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "var(--color5)", minHeight: "100vh" }}>
      <h1 style={{ color: "var(--color1)", marginBottom: "1.5rem" }}>Current orders</h1>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        requests.map((item) => {
          const { id, description, business_name } = item.request;
          const ownerCategory = item.user_name; 

          return (
            <RequestCard
              key={id}
              id={id}
              businessName={business_name}
              ownerCategory={ownerCategory}
              description={description}
            />
          );
        })
      )}
    </div>
  );
};

export default Requist;

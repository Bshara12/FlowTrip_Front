// ✅ Packages.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Packages.css";
import Button from "../Component/AddButton";
import PackageCard from "../Component/PackageCard";
import loadingImage from "../Assets/Loading_icon.gif"; 
import Loader from "../Component/Loader";
import { baseURL, GET_ALL_PACKAGE, TOKEN } from "../Api/Api";

  const token = TOKEN;

export default function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${baseURL}/${GET_ALL_PACKAGE}`,{
          headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
            'Authorization': 'Bearer ' +"yPlMu9DzUniMPPQSqt81DD2YMmSv1zhX7RMGS74i6b055edd"
=======
            'Authorization': `Bearer ${token}`
>>>>>>> 192ae829312c3ed5f9f2dd98cd4963df58110318
            }
        });
        if (res.data && res.data.data) {
          setPackages(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/package-details/${id}`);
  };

  return (
    <div className="RightPare">
      <h1 style={{ margin: "10px 0 0 30px" }}>Packages</h1>
      <div className="cards">
        {loading ? (
         <>
  <Loader />
  <img
    src={loadingImage}
    alt="Loading..."
    style={{ width: "100px", margin: "50px auto" }}
  />
</>

        ) : (
          packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
              title={pkg.tourism_company?.company_name || "Unknown Company"}
              description={pkg.discription}
              price={pkg.total_price}
              isPointPayment={pkg.payment_by_points === 1}
              onClick={() => handleCardClick(pkg.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// TODO: Add route for /add-package/step1 in your router (e.g., in App.js or Routes.js)
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Packages.css"; 
import Button from "../Component/AddButton";
import PackageCard from "../Component/PackageCard";
import { useNavigate } from "react-router-dom";

const PackagesTourism = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/tourism/getPackagesfortourism", {
          headers: {
            Authorization: "Bearer 3|iahc2UzlgTL9Cse8VHDk34185SOvxA1kHuXV2jo4d0c43b6c",
          },
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

  const handleAddClick = () => {
    navigate("/add-package/step1");
  };

  if (loading) return <p>Loading...</p>;
  localStorage.setItem("user_type", "tourism"); 


  return (
    <div className="packagesPageContainer">
      <div className="packagesHeader">
        <h1>Available Packages</h1>
        <Button text="Add Package" onClick={handleAddClick} />
      </div>

      <div className="packagesGrid">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            id={pkg.id}
            image={pkg.picture || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
            title={`Package #${pkg.id}`}
            description={pkg.description}
            price={pkg.total_price}
            isPointPayment={pkg.payment_by_points === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesTourism;

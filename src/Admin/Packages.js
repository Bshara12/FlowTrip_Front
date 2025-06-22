import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import Card from "../Component/Card";
import "./Packages.css";
import Button from "../Component/AddButton";
import PackageCard from "../Component/PackageCard";

export default function Packages() {
  const navigate = useNavigate();

  // بيانات وهمية مؤقتة إلى أن يتم ربط الباك اند لاحقًا
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Demo Restaurant",
      user_name: "John Doe",
      location: "Damascus",
    },
    {
      id: 2,
      name: "Sample Diner",
      user_name: "Jane Smith",
      location: "Aleppo",
    },
  ]);

  const handleCardClick = (id) => {
    navigate(`/restaurant-details/${id}`);
  };

  return (
    <div className="RightPare">
      {/* <div className="addbutton">
        <button role="button" className="golden-button">
          <Link className="golden-text" to="/Admin/dashbord/UserSelection">
            Add
            <i className="fa-solid fa-plus" style={{ marginLeft: "5px" }}></i>
          </Link>
        </button>
      </div> */}
      <Button />
      <div className="cards">
        {restaurants.map((restaurant) => (
          <PackageCard
          id="alqara-001"
            image="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
            title="Al Qarah Mountain"
            description="Explore one of Al-Ahsa’s most breathtaking natural wonders and cultural sites."
            price="199"
          />
        ))}
      </div>
    </div>
  );
}

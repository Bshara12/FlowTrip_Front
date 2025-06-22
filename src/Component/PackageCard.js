import React from "react";
import { Link } from "react-router-dom";
import "./PackageCard.css";

const PackageCard = ({ id, image, title, description, price }) => {
  return (
    <Link to={`/package/${id}`} className="packageComponentLink">
      <div
        className="packageComponentCard"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="packageComponentOverlay">
          <h3 className="packageComponentTitle">{title}</h3>
          <p className="packageComponentDescription">{description}</p>
          <span className="packageComponentPrice">${price}</span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;

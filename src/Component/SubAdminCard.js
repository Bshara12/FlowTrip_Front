import React from "react";
import "./OwnerCard.css";

const SubAdminCard = ({ name, email, phoneNumber, style, onClick, buttonText}) => {
  return (
    <div className="card" style={style} onClick={onClick}>
      <div className="card-image"></div>
      <div className="card-description">
        <p className="text-title">{name}</p>
        <p className="text-body">
          <span className="info-row">
            <span className="info-icon">📧</span>
            <span className="info-label">Email:</span>
            <span className="info-value">{email}</span>
          </span>
          <span className="info-row">
            <span className="info-icon">☎️</span>
            <span className="info-label">Number:</span>
            <span className="info-value">{phoneNumber}</span>
          </span>
        </p>
      </div>
      <div className="card-review">
        {buttonText || "Review"}
      </div>
    </div>
  );
};

export default SubAdminCard;
import React from "react";
import "./OwnerCard.css";

const OwnerCard = ({ name, location, phoneNumber, category, style, onClick, isUserView }) => {
  return (
    <div className="card" style={style} onClick={onClick}>
      <div className="card-image"></div>
      <div className="card-description">
        <p className="text-title">{name}</p>
        <p className="text-body">
          {isUserView ? (
            <>
              <span className="info-row">
                <span className="info-icon">📍</span>
                <span className="info-label">Location:</span>
                <span className="info-value">{location}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">☎️</span>
                <span className="info-label">Number:</span>
                <span className="info-value">{phoneNumber}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">🏷️</span>
                <span className="info-label">Category:</span>
                <span className="info-value">{category}</span>
              </span>
            </>
          ) : (
            <>
              <span className="info-row">
                <span className="info-icon">📏</span>
                <span className="info-label">Area:</span>
                <span className="info-value">{location}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">💲</span>
                <span className="info-label">Old Price:</span>
                <span className="info-value">{phoneNumber}</span>
              </span>
              <span className="info-row">
                <span className="info-icon">🔥</span>
                <span className="info-label">Offer Price:</span>
                <span className="info-value">{category}</span>
              </span>
            </>
          )}
        </p>
      </div>
      <div className="card-review">Review</div>
    </div>
  );
};

export default OwnerCard; 
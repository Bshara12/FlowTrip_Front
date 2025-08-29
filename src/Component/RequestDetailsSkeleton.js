// src/components/RequestDetailsSkeleton.js
import React from "react";
import "./RequestDetailsSkeleton.css";

const RequestDetailsSkeleton = () => {
  return (
    <div className="request-details-container">
      <div className="request-details-card skeleton-card">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton-section">
          <div className="skeleton skeleton-subtitle"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>

        <div className="skeleton-section">
          <div className="skeleton skeleton-subtitle"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>

        <div className="skeleton-buttons">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsSkeleton;

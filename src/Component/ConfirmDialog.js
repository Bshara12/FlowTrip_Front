import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <h2 className="confirm-title">Confirm deletion</h2>
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-ok" onClick={onConfirm}>Yes, delete</button>
          <button className="confirm-cancel" onClick={onCancel}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

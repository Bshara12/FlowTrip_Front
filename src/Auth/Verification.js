import React, { useRef } from "react";
import "./Verification.css";

const Verification = () => {
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const isDelete = e.inputType === "deleteContentBackward";

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!value && isDelete && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="verification-wrapper">
      <form className="form">
        <div className="content">
          <p align="center">OTP Verification</p>
          <div className="inp">
            {Array.from({ length: 6 }, (_, i) => (
              <input
                key={i}
                type="text"
                className="input"
                maxLength={1}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleInputChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>
          <button type="submit">Verify</button>
          <svg
            className="svg"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4073ff"
              d="M56.8,-23.9C61.7,-3.2,45.7,18.8,26.5,31.7C7.2,44.6,-15.2,48.2,-35.5,36.5C-55.8,24.7,-73.9,-2.6,-67.6,-25.2C-61.3,-47.7,-30.6,-65.6,-2.4,-64.8C25.9,-64.1,51.8,-44.7,56.8,-23.9Z"
              transform="translate(100 100)"
              className="path"
            ></path>
          </svg>
        </div>
      </form>
    </div>
  );
};

export default Verification;

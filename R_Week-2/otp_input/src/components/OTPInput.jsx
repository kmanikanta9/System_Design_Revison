import React, { useState, useRef } from "react";

const OTPInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (newOtp.every((digit) => digit !== "")) {
      console.log("OTP Entered:", newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[3].focus();
    }
  };

  const handleSubmit = () => {
    const completeOtp = otp.join("");
    if (completeOtp.length === 4) {
      alert(`Submitted OTP: ${completeOtp}`);
    } else {
      alert("Please enter all 4 digits of the OTP.");
    }
  };

  return (
    <div className="otp-container">
      <h2>🔢 Enter OTP</h2>
      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="otp-box"
          />
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default OTPInput;

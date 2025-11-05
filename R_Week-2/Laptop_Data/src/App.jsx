import React, { useState } from "react";
import "./App.css";

const LaptopCustomizer = () => {
  const basePrice = 60000;

  const [config, setConfig] = useState({
    processor: "",
    ram: "",
    storage: "",
    color: "",
    totalPrice: basePrice,
  });

  const priceAdd = {
    processor: { i5: 0, i7: 10000, i9: 20000 },
    ram: { "8GB": 0, "16GB": 5000, "32GB": 10000 },
    storage: { "512GB SSD": 0, "1TB SSD": 6000, "2TB HDD": 3000 },
  };

  const handleChange = (field, value) => {
    const updated = { ...config, [field]: value };

    const newPrice =
      basePrice +
      (priceAdd.processor[updated.processor] || 0) +
      (priceAdd.ram[updated.ram] || 0) +
      (priceAdd.storage[updated.storage] || 0);

    setConfig({ ...updated, totalPrice: newPrice });
  };

  const resetConfig = () => {
    setConfig({
      processor: "",
      ram: "",
      storage: "",
      color: "",
      totalPrice: basePrice,
    });
  };

  return (
    <div className="container">
      <h1>Laptop Customizer</h1>

      <div className="form">
        <label>
          Processor:
          <select
            value={config.processor}
            onChange={(e) => handleChange("processor", e.target.value)}
          >
            <option value="">Select</option>
            <option value="i5">Intel i5</option>
            <option value="i7">Intel i7</option>
            <option value="i9">Intel i9</option>
          </select>
        </label>

        <label>
          RAM:
          <select
            value={config.ram}
            onChange={(e) => handleChange("ram", e.target.value)}
          >
            <option value="">Select</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
          </select>
        </label>

        <label>
          Storage:
          <select
            value={config.storage}
            onChange={(e) => handleChange("storage", e.target.value)}
          >
            <option value="">Select</option>
            <option value="512GB SSD">512GB SSD</option>
            <option value="1TB SSD">1TB SSD</option>
            <option value="2TB HDD">2TB HDD</option>
          </select>
        </label>

        <label>
          Color:
          <select
            value={config.color}
            onChange={(e) => handleChange("color", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Silver">Silver</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </label>

        <button onClick={resetConfig}>Reset</button>
      </div>

      <div
        className="preview"
        style={{
          borderColor: config.color ? config.color.toLowerCase() : "gray",
        }}
      >
        <h2>Preview</h2>
        <p>Processor: {config.processor || "Not selected"}</p>
        <p>RAM: {config.ram || "Not selected"}</p>
        <p>Storage: {config.storage || "Not selected"}</p>
        <p>Color: {config.color || "Not selected"}</p>
        <h3>Total Price: ₹{config.totalPrice.toLocaleString("en-IN")}</h3>
      </div>
    </div>
  );
};

export default LaptopCustomizer;

// src/Components/ExportData.jsx
import React from "react";

const ExportData = () => {
  const handleExport = () => {
    // Logic to handle exporting data
    console.log("Data export triggered!");
    alert("Exporting data...");
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <h1 className="text-[36px] text-[#0B666A] font-semibold mb-[100px]">
        Export Data
      </h1>
      <p className="mb-6">Click the button below to export your data.</p>
      <button
        onClick={handleExport}
        className="bg-[#35A29F] text-white px-6 py-3 rounded-lg hover:bg-[#2B7C77] transition"
      >
        Export Data
      </button>
    </div>
  );
};

export default ExportData;

// src/Components/ExportData.jsx
import React from "react";
import { jsPDF } from "jspdf";
import pdf from "/pdf.png";
import excel from "/excel.png";
import { toast } from "react-toastify";

import { pb } from "../../pocketbaseService"; // Import the fetch function
import "jspdf-autotable";

const ExportData = () => {
  // Fetching transactions with user relation expanded
  const getTransactions = async () => {
    try {
      const result = await pb.collection("transactions").getFullList(200, {
        expand: "user", // Expand the 'user' relation
      });
      return result;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };

  // Reorganizing data and filtering out records with "Unknown User"
  const reorganizeData = async (transactions) => {
    const reorganizedData = await Promise.all(
      transactions.map(async (transaction) => {
        const user = transaction.expand.user || {}; // Access the expanded user object
        const userName = user.name || "Unknown User"; // Get the user's name

        // If user name is "Unknown User", exclude the record
        if (userName === "Unknown User") {
          return null; // This will filter out this record
        }

        return {
          Name: transaction.name || "N/A",
          Type: transaction.type || "Unknown",
          Category: transaction.category || "Uncategorized",
          Amount: transaction.amount || 0,
          User: userName,
        };
      })
    );

    // Filter out any null values from the reorganized data
    return reorganizedData.filter((item) => item !== null);
  };

  // Convert Data to CSV
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]); // Get headers from the first object
    const rows = data.map(
      (row) => headers.map((header) => `"${row[header] || ""}"`).join(",") // Enclose each field in quotes
    );

    return [headers.join(","), ...rows].join("\n"); // Combine headers and rows
  };
  // Download File Helper
  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle CSV Export
  const exportCSV = async () => {
    try {
      const transactions = await getTransactions();
      if (transactions.length === 0) {
        alert("No data available for export.");
        return;
      }

      // Reorganize data
      const reorganizedData = await reorganizeData(transactions);

      // Convert to CSV
      const csvData = convertToCSV(reorganizedData);

      // Download CSV
      downloadFile(csvData, "transactions.csv", "text/csv");
      toast.success("Data exported as CSV successfully!");
    } catch (error) {
      console.error("Error exporting data as CSV:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  // Handle PDF Export
  const exportPDF = async () => {
    try {
      const transactions = await getTransactions();
      if (transactions.length === 0) {
        toast.warning("No data available for export.");
        return;
      }

      // Reorganize data
      const reorganizedData = await reorganizeData(transactions);

      // Prepare PDF
      const doc = new jsPDF();
      const headers = ["Name", "Type", "Category", "Amount", "User"];
      const rows = reorganizedData.map((row) =>
        headers.map((header) => row[header] || "")
      );

      doc.text("Transactions Report", 10, 10); // Title
      doc.autoTable({
        head: [headers], // Add headers
        body: rows, // Add rows
      });

      // Save PDF
      doc.save("transactions.pdf");
      toast.success("Data exported as PDF successfully!");
    } catch (error) {
      console.error("Error exporting data as PDF:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <h1 className="text-[36px] text-[#0B666A] font-semibold my-[100px]">
        Export Data
      </h1>
      <p className="mb-6">Choose a format to export your transactions data:</p>
      <div className="flex gap-4">
        <button
          onClick={exportCSV}
          className="bg-green-700 text-white text-[26px] font-semibold flex gap-5 shadow-xl items-center px-6 py-3 rounded-lg hover:bg-green-900 transition"
        >
          <img src={excel} className="w-[50px]" alt="" />
          Export as CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white text-[26px] font-semibold flex gap-5 shadow-xl items-center px-6 py-3 rounded-lg hover:bg-red-800 transition"
        >
          <img src={pdf} className="w-[50px]" alt="" />
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default ExportData;

import React, { useState } from "react";
import TransactionForm from "./TransactionForm";
import { addTransaction } from "../../pocketbaseService";
import { toast } from "react-toastify";

export default function AddTransaction() {
  const handleTransactionSubmit = async (transactionData) => {
    try {
      // Call the addTransaction function with the data from the form
      const newTransaction = await addTransaction(transactionData);
      console.log("Transaction added:", newTransaction);
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction.");
    }
  };

  return (
    <div>
      <h1 className=" text-[36px] text-[#0B666A] font-semibold mb-[100px]">
        Add Transaction
      </h1>
      <TransactionForm
        onSubmit={handleTransactionSubmit} // Handle form submission
      />
    </div>
  );
}

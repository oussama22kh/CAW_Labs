import { addTransaction } from "../../pocketbaseService";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTransaction() {
  const [transactionData, setTransactionData] = useState({
    name: "",
    type: "income", // Default to income
    amount: "",
    date: "",
    category: "Groceries", // Default category
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Groceries",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Health",
    "Shopping",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleTypeChange = (type) => {
    setTransactionData({ ...transactionData, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTransaction(transactionData);
      toast.success("Transaction added successfully!");
      setTransactionData({
        name: "",
        type: "income",
        amount: "",
        date: "",
        category: "Groceries",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add transaction. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[36px] text-[#0B666A] font-semibold">
        Add Transaction
      </h1>
      <div className="mt-[50px] w-full flex flex-col gap-5">
        {/* Type Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleTypeChange("income")}
            className={`px-4 py-2 rounded-md ${
              transactionData.type === "income"
                ? "bg-[#97FEED] text-[#071952]"
                : "bg-gray-200 text-gray-700"
            } transition duration-200`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("expense")}
            className={`px-4 py-2 rounded-md ${
              transactionData.type === "expense"
                ? "bg-[#F95454] text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-200`}
          >
            Expense
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Transaction Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={transactionData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring transition ${
                transactionData.type === "income"
                  ? "focus:ring-[#97FEED]"
                  : "focus:ring-[#F95454]"
              }`}
              placeholder="Enter transaction name"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block mb-1 font-medium">
              Amount (DZD)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transactionData.amount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring transition ${
                transactionData.type === "income"
                  ? "focus:ring-[#97FEED]"
                  : "focus:ring-[#F95454]"
              }`}
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block mb-1 font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={transactionData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring transition ${
                transactionData.type === "income"
                  ? "focus:ring-[#97FEED]"
                  : "focus:ring-[#F95454]"
              }`}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={transactionData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring transition ${
                transactionData.type === "income"
                  ? "focus:ring-[#97FEED]"
                  : "focus:ring-[#F95454]"
              }`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block mb-1 font-medium">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={transactionData.notes}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring transition ${
                transactionData.type === "income"
                  ? "focus:ring-[#97FEED]"
                  : "focus:ring-[#F95454]"
              }`}
              placeholder="Add any notes here"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white px-4 py-2 rounded-md hover:shadow-lg transition duration-300  ${
              transactionData.type === "income"
                ? "bg-[#97FEED] text-[#071952]"
                : "bg-[#F95454]"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

export default function TransactionForm({
  initialData = null, // For the update case, it will be passed the existing transaction data
  onSubmit, // Prop to handle form submission
}) {
  const [transactionData, setTransactionData] = useState({
    name: "",
    type: "income", // Default to income
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Health",
    "Entertainment",
    "Other",
  ]; // Example categories

  // If we are in update mode, set the initial state with the data passed from the parent
  useEffect(() => {
    if (initialData) {
      setTransactionData({
        name: initialData.name,
        type: initialData.type,
        amount: initialData.amount,
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "", // Format date to yyyy-MM-dd,
        category: initialData.category,
        notes: initialData.notes,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (type) => {
    setTransactionData({
      ...transactionData,
      type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      // Pass the transaction data to the parent onSubmit handler
      await onSubmit(transactionData);
      setTransactionData({
        name: "",
        type: "income",
        amount: "",
        date: "",
        category: "",
        notes: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Type Buttons */}
      <div>
        <label htmlFor="id" className="block mb-2 text-[#071952] font-medium">
          Transaction Type
        </label>
        <div id="type" className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleTypeChange("income")}
            className={`px-4 py-2 rounded-md ${
              transactionData.type === "income"
                ? "bg-[#97FEED] text-[#071952]"
                : "bg-gray-200 text-[#071952]"
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
                : "bg-gray-200 text-[#071952]"
            } transition duration-200`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Transaction Name */}
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-[#071952] font-medium "
        >
          Transaction Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={transactionData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md 
            ${
              transactionData.type === "expense"
                ? "focus:ring-[#F95454]  focus:outline-none focus:ring-2 "
                : "focus:ring-[#97FEED]  focus:outline-none focus:ring-2"
            }`}
          placeholder="Enter transaction name"
          required
          autoFocus
        />
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block mb-2 text-[#071952] font-medium"
        >
          Amount (DZD)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={transactionData.amount}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md 
            ${
              transactionData.type === "expense"
                ? "focus:ring-[#F95454]  focus:outline-none focus:ring-2 "
                : "focus:ring-[#97FEED]  focus:outline-none focus:ring-2"
            }`}
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block mb-2 text-[#071952] font-medium">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={transactionData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md 
            ${
              transactionData.type === "expense"
                ? "focus:ring-[#F95454]  focus:outline-none focus:ring-2 "
                : "focus:ring-[#97FEED]  focus:outline-none focus:ring-2"
            }`}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block mb-2 text-[#071952] font-medium"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={transactionData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md 
            ${
              transactionData.type === "expense"
                ? "focus:ring-[#F95454]  focus:outline-none focus:ring-2 "
                : "focus:ring-[#97FEED]  focus:outline-none focus:ring-2"
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
        <label
          htmlFor="notes"
          className="block mb-2 text-[#071952] font-medium"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={transactionData.notes}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-2 border rounded-md 
            ${
              transactionData.type === "expense"
                ? "focus:ring-[#F95454]  focus:outline-none focus:ring-2 "
                : "focus:ring-[#97FEED]  focus:outline-none focus:ring-2"
            }`}
          placeholder="Add some notes"
        />
      </div>

      <button
        type="submit"
        className={`${
          transactionData.type === "income"
            ? "bg-[#97FEED] text-[#071952]"
            : "bg-[#F95454] text-white"
        }  py-2 rounded-md hover:shadow-lg transition duration-200`}
      >
        {initialData ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}

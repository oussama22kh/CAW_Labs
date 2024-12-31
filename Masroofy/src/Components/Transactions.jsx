import { useState, useEffect } from "react";

export default function Transactions({ transactions, onEdit, onDelete }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  // Filter transactions whenever the filter or transactions change
  useEffect(() => {
    let filtered = transactions;

    if (filter.category) {
      filtered = filtered.filter(
        (transaction) => transaction.category === filter.category
      );
    }

    if (filter.date) {
      filtered = filtered.filter(
        (transaction) => transaction.date === filter.date
      );
    }

    setFilteredTransactions(filtered);
  }, [filter, transactions]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <h1 className=" text-[36px] text-[#0B666A] font-semibold">
        Transactions
      </h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mt-4">
        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md focus:outline-none"
        >
          <option value="">All Categories</option>
          {/* Dynamically populate categories */}
          {Array.from(new Set(transactions.map((t) => t.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>

        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md focus:outline-none"
        />
      </div>

      {/* Transaction List */}
      <div className="mt-6">
        {filteredTransactions.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Amount</th>
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Category</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.amount} DZD
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {transaction.category}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 space-x-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
}

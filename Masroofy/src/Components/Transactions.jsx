import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../../pocketbaseService";
import TransactionForm from "./TransactionForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  TextField,
  Pagination,
} from "@mui/material";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await getTransactions();
        setTransactions(response);
        setFilteredTransactions(response);
      } catch (error) {
        if (!loading) {
          toast.error("Failed to load transactions. Please try again.");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Filter transactions based on category or date
  useEffect(() => {
    let filtered = transactions;

    if (categoryFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.category === categoryFilter
      );
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date).toDateString() ===
          selectedDate.toDateString()
      );
    }

    setFilteredTransactions(filtered);
  }, [categoryFilter, dateFilter, transactions]);

  // Handle transaction deletion
  const handleDelete = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction(transactionToDelete.id);
        setTransactions((prev) =>
          prev.filter(
            (transaction) => transaction.id !== transactionToDelete.id
          )
        );
        toast.success("Transaction deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete transaction. Please try again.");
        console.error(error);
      } finally {
        setOpenDeleteDialog(false);
        setTransactionToDelete(null);
      }
    }
  };

  // Handle Edit
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleUpdateTransaction = async (formData) => {
    if (!selectedTransaction) return;

    try {
      await updateTransaction(selectedTransaction.id, formData);
      toast.success("Transaction updated successfully.");
      setOpenDialog(false);
      setSelectedTransaction(null);
      const updatedTransactions = await getTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      toast.error("Failed to update transaction.");
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-[36px] text-[#0B666A] font-semibold">Transactions</h1>

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          displayEmpty
          className="min-w-[200px]"
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <TextField
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="min-w-[200px]"
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading transactions...</p>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <table className="mt-[20px] min-w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-4 border-b-2 text-start">Name</th>
                <th className="px-4 py-4 border-b-2 text-start">Type</th>
                <th className="px-4 py-4 border-b-2 text-start">Amount</th>
                <th className="px-4 py-4 border-b-2 text-start">Category</th>
                <th className="px-4 py-4 border-b-2 text-start">Date</th>
                <th className="px-4 py-4 border-b-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-4 border-b text-start">
                      {transaction.name}
                    </td>
                    <td className="px-4 py-4 border-b text-start">
                      <span
                        className={`px-4 py-1 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-[#97FEED] text-[#071952]"
                            : "bg-[#F95454] text-white"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-b text-start">
                      {transaction.amount} DZD
                    </td>
                    <td className="px-4 py-4 border-b text-start">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-4 border-b text-start">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-4 border-b text-start">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="bg-gray-200 text-[#071952] hover:bg-gray-400 px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setTransactionToDelete(transaction);
                          setOpenDeleteDialog(true);
                        }}
                        className="bg-[#F95454] text-white hover:bg-red-700 ml-4 px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            count={Math.ceil(filteredTransactions.length / transactionsPerPage)}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            className="mt-4"
            shape="rounded"
          />
        </div>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm
            initialData={selectedTransaction}
            onSubmit={handleUpdateTransaction}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this transaction?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

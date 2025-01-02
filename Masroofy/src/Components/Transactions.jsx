import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../../pocketbaseService"; // Assuming you have functions to get, update, and delete transactions
import TransactionForm from "./TransactionForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material"; // Import Dialog components

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Manage dialog open state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For delete confirmation dialog
  const [transactionToDelete, setTransactionToDelete] = useState(null); // To store transaction to be deleted

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await getTransactions();
        setTransactions(response);
      } catch (error) {
        console.log(loading);
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
        setOpenDeleteDialog(false); // Close delete dialog
        setTransactionToDelete(null); // Clear the transaction to delete
      }
    }
  };

  // Handle Edit (Set the selected transaction to update)
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true); // Open the dialog
  };

  const handleUpdateTransaction = async (formData) => {
    if (!selectedTransaction) return;

    try {
      await updateTransaction(selectedTransaction.id, formData); // Update the transaction
      toast.success("Transaction updated successfully.");
      setOpenDialog(false);
      setSelectedTransaction(null); // Clear the selected transaction after update
      const updatedTransactions = await getTransactions(); // Fetch the updated list
      setTransactions(updatedTransactions);
    } catch (error) {
      toast.error("Failed to update transaction.");
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Show only date part
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className=" text-[36px] text-[#0B666A] font-semibold">
        Transactions
      </h1>
      {loading ? (
        <p className="text-center">Loading transactions...</p>
      ) : (
        <table className="mt-[100px] min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-4 border-b-2 text-start ">Name</th>
              <th className="px-4 py-4 border-b-2 text-start">Type</th>
              <th className="px-4 py-4 border-b-2 text-start">Amount</th>
              <th className="px-4 py-4 border-b-2 text-start">Category</th>
              <th className="px-4 py-4 border-b-2 text-start">Date</th>
              <th className="px-4 py-4 border-b-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
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
                  <td className="px-4 py-4 border-b  text-start">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-4 border-b text-start">
                    <button
                      onClick={() => handleEdit(transaction)} // Trigger edit
                      className="bg-gray-200 text-[#071952] hover:bg-gray-400 px-4 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setTransactionToDelete(transaction); // Set the transaction to delete
                        setOpenDeleteDialog(true); // Open the delete confirmation dialog
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
      )}

      {/* Dialog for editing a transaction */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm
            initialData={selectedTransaction}
            onSubmit={handleUpdateTransaction}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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

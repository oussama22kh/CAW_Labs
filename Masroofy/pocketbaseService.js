import PocketBase from "pocketbase";

const pb = new PocketBase("https://masroofy.pockethost.io");

export const addTransaction = async (transactionData) => {
  try {
    const response = await pb
      .collection("transactions")
      .create(transactionData);
    return response; // Returns the created transaction object
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const transactions = await pb.collection("transactions").getFullList({
      expand: "relField1,relField2.subRelField", // Add fields to expand if needed
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const updateTransaction = async (id, data) => {
  try {
    return await pb.collection("transactions").update(id, data);
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    return await pb.collection("transactions").delete(id);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const fetchTransactionById = async (id) => {
  try {
    const response = await pb.collection("transactions").getOne(id, {
      expand: "relField1,relField2.subRelField", // Add fields to expand if needed
    });
    return response;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw new Error("Failed to fetch transaction");
  }
};

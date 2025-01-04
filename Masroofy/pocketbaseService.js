import PocketBase from "pocketbase";

export const pb = new PocketBase("https://masroofy.pockethost.io");
pb.autoCancellation(false);

// Adds a new transaction associated with the currently authenticated user
export const addTransaction = async (transactionData) => {
  try {
    // Ensure the user is authenticated
    const userId = pb.authStore?.model?.id;
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    // Attach the user ID to the transaction
    const data = { ...transactionData, user: userId };
    const response = await pb.collection("transactions").create(data);
    return response; // Returns the created transaction object
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Fetches all transactions for the authenticated user
export const getTransactions = async () => {
  try {
    // Ensure the user is authenticated
    const userId = pb.authStore?.model?.id;
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const transactions = await pb.collection("transactions").getFullList({
      filter: `user='${userId}'`, // Ensure user-specific transactions
      sort: "-created", // Example: sort transactions by creation date (newest first)
    });
    console.log(transactions);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Updates an existing transaction by ID
export const updateTransaction = async (id, data) => {
  try {
    const response = await pb.collection("transactions").update(id, data);
    return response;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Deletes a transaction by ID
export const deleteTransaction = async (id) => {
  try {
    const response = await pb.collection("transactions").delete(id);
    return response;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

// Fetches a single transaction by ID with optional expanded fields
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

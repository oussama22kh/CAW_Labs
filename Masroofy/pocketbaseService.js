import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090"); // Replace with your PocketBase URL

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

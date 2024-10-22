const createTransaction = require("../services/createTransaction");
const retrieveAllTransactions = require("../services/retrieveAllTransactions");
const retrieveATransaction = require("../services/retrieveATransaction");
const updateTransaction = require("../services/updateTransaction");
const deleteTransaction = require("../services/deleteTransaction");

const addNewTransaction = async (request, response) => {
  const { type, categoryId, amount, date } = request.body;

  //Input validation
  if (!type || !categoryId || !amount || !date) {
    return response.status(400).json({
      error: "Bad Request",
      message: "Please fill the requied fields",
    });
  }

  //Creating Transaction
  try {
    await createTransaction(request);
    return response.status(201).json({
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.log(`Transaction creation failed: ${error}`);
    return response.status(500).json({
      error: "Internal server error",
      message: "Failed to create the transaction",
    });
  }
};

const getAllTransactions = async (request, response) => {
  try {
    const allTransactions = await retrieveAllTransactions(request);
    return response.status(200).json({
      message: "Transactions retrieved successfully",
      allTransactions,
    });
  } catch (error) {
    console.log(`Failed to retrieve transactions: ${error.message}`);
    return response.status(500).json({
      error: "Internal server error",
      message: "Falied to retrieve the transactions",
    });
  }
};

const getSingleTransaction = async (request, response) => {
  const { id } = request.params;
  try {
    const transaction = await retrieveATransaction(request);

    //If no transaction found
    if (!transaction) {
      return response.status(404).json({
        error: "Not Found",
        message: `Transaction with ID ${id} not found`,
      });
    }

    //Transaction found
    return response.status(200).json({
      transaction,
    });
  } catch (error) {
    console.log(
      `Failed to retrieve transaction with id:${id}: ${error.message}`
    );
    return response.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve the transaction",
    });
  }
};

const updateTransactionById = async (request, response) => {
  const { id } = request.params;
  const { type, categoryId, amount, date } = request.body;

  if (!type || !categoryId || !amount || !date) {
    return response.status(400).json({
      error: "Bad Request",
      message: "Please fill all the required fields",
    });
  }

  try {
    const result = await updateTransaction(request);

    if (result.changes === 0) {
      return response.status(404).json({
        error: "Not Found",
        message: `Transaction with Id ${id} not found`,
      });
    }

    const updatedTransaction = await retrieveATransaction(request);

    return response.status(200).json({
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    console.log(
      `Failed to update transaction with id:${id} : ${error.message}`
    );
    return response.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update the transaction",
    });
  }
};

const deleteTransactionById = async (request, response) => {
  const { id } = request.params;
  try {
    const isTransactionExists = await retrieveATransaction(request);

    if (!isTransactionExists) {
      return response.status(404).json({
        error: "Not Found",
        message: "Transaction not found!",
      });
    }

    await deleteTransaction(request);
    return response.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.log(
      `Transaction deletion with id ${id} failed due to: ${error.message}`
    );
    return response.status(500).json({
      error: "Internal server error",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addNewTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransactionById,
  deleteTransactionById,
};

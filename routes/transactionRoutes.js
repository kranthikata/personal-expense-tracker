const express = require("express");
const {
  addNewTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransactionById,
  deleteTransactionById,
} = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); //Creating a router instance

router
  .route("/")
  .post(authMiddleware, addNewTransaction)
  .get(authMiddleware, getAllTransactions);
router
  .route("/:id")
  .get(authMiddleware, getSingleTransaction)
  .put(authMiddleware, updateTransactionById)
  .delete(authMiddleware, deleteTransactionById);

module.exports = router;

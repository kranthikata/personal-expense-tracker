const express = require("express");
const summaryController = require("../controllers/summaryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, summaryController);

module.exports = router;

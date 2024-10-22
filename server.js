const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json()); // Accept the JSON data from the request
app.use(cors()); //Avoid CORS error
require("dotenv").config();

let db;

const establishDbConnectionAndServer = async () => {
  try {
    db = await connectDb();
    app.listen(3000, () => {
      console.log("Server is started and running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
};

establishDbConnectionAndServer();

//Middleware to attach 'db' to request making it accessible in routes
app.use((request, response, next) => {
  request.db = db;
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/summary", summaryRoutes);

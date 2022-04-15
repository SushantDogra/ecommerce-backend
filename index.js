const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

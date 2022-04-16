const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection is Successful"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
  res.send("OK");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.get("/", (req, res) => {
  res.send("Welcome to AgriTrust");
});

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


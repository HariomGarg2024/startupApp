import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import dealRoutes from "./routes/dealRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

dotenv.config();

const app = express(); 


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);


app.get("/", (req, res) => {
  res.send("API running");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

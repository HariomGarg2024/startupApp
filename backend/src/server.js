import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(5000, () => console.log("Backend running on 5000"));

import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: String,
  description: String,
  partner: String,
  category: String,
  locked: Boolean,
  eligibility: String
}, { timestamps: true });

export default mongoose.model("Deal", dealSchema);

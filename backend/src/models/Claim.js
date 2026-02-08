import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true
    },
    status: {
      type: String,
      enum: ["claimed"],
      default: "claimed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);

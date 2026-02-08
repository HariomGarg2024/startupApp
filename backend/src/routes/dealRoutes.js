import express from "express";
import Deal from "../models/Deal.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deals" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deal" });
  }
});

export default router;

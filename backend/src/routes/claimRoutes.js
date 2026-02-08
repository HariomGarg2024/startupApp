import express from "express";
import { claimDeal, myClaims } from "../controllers/claimController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();


router.post("/:dealId", protect, claimDeal);


router.get("/", protect, myClaims);

export default router;

import express from "express";
import { register, login } from "../controllers/authController.js";
import { getDeals, getDeal } from "../controllers/dealController.js";
import { claimDeal, myClaims } from "../controllers/claimController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/deals", getDeals);
router.get("/deals/:id", getDeal);

router.post("/deals/:id/claim", protect, claimDeal);
router.get("/claims", protect, myClaims);

export default router;

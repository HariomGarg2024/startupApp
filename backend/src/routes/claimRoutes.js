import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { claimDeal, getMyClaims } from '../controllers/claimController.js';

const router = express.Router();


router.post('/:dealId', protect, claimDeal);
router.get('/my-dashboard', protect, getMyClaims);

// contr fxn
export const claimDeal = async (req, res) => {
  const deal = await Deal.findById(req.params.dealId);
  
 
  if (deal.locked && !req.user.isVerified) {
    return res.status(403).json({ 
      message: 'This premium deal requires startup verification.' 
    });
  }
  
 
};

export default router;
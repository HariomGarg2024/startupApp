import User from "../models/User.js";
import Claim from '../models/Claim.js';
import Deal from '../models/Deal.js';


export const claimDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealId);

    if (!deal) return res.status(404).json({ message: 'Deal not found' });

   
    if (deal.locked && !req.user.isVerified) {
      return res.status(403).json({ message: 'Verification required for premium deals' });
    }

    
    const alreadyClaimed = await Claim.findOne({ user: req.user._id, deal: deal._id });
    if (alreadyClaimed) return res.status(400).json({ message: 'Deal already claimed' });

    const claim = await Claim.create({ 
      user: req.user._id, 
      deal: deal._id,
      status: 'approved' 
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const myClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate('deal');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
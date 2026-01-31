import Claim from "../models/Claim.js";
import Deal from "../models/Deal.js";
import User from "../models/User.js";

export const claimDeal = async (req, res) => {
  const deal = await Deal.findById(req.params.id);
  const user = await User.findById(req.userId);

  if (deal.locked && !user.verified)
    return res.status(403).json({ message: "Verification required" });

  const claim = await Claim.create({ user: user._id, deal: deal._id });
  res.json(claim);
};

export const myClaims = async (req, res) => {
  const claims = await Claim.find({ user: req.userId }).populate("deal");
  res.json(claims);
};

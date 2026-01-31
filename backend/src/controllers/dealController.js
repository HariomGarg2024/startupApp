import Deal from "../models/Deal.js";

export const getDeals = async (_, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

export const getDeal = async (req, res) => {
  const deal = await Deal.findById(req.params.id);
  res.json(deal);
};

import amountModel from "../models/amountModel";

export const createAmountController = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(401).send({
        message: "Enter the amount",
      });
    }
    const deposit = await new amountModel().save();
    res.status(201).send({
      success: true,
      message: "Amount inserted",
      deposit,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in amount",
    });
  }
};

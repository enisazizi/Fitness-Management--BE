import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { clientModel } from "../clients/schema";
import { paymentModel } from "./schema";
import { errorMessage } from "../../types/errors";

const newPayment = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const payment = new paymentModel({
      ...req.body,
      companyId: req.company?._id,
    });
    await payment.save();
    res.status(201).send(payment._id);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};

const getPayments = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const payments = await clientModel.find({ company_id: req.company?._id });
    if (payments.length < 1)
      res.status(404).send("No payments made untill now");
    res.status(200).send(payments);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};
const getSinglePayment = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    const id = req.params.id;
    const payment = await paymentModel.findById(id);
    res.status(200).send(payment);
  } catch (error) {}
};
const cancelPayment = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {};

export default { newPayment, getPayments, getSinglePayment };

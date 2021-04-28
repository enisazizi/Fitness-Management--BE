import { clientModel } from "./schema";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { cartModel } from "../cart/schema";
import jwt from "../auth/jwt";

const newClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.company?._id;
    const payload = req.body;
    const newClient = new clientModel({
      ...req.body,
      company_id: companyId,
    });

    const { _id } = await newClient.save();
    await new cartModel({ clientId: _id }).save();
    const token = jwt.makePayment(_id, payload.time);
    if (token) {
      const addTokenPayment = await clientModel.findByIdAndUpdate(_id, {
        accessToken: token,
      });

      res.status(201).send(_id);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientModel.findById(req.client?._id);
    res.status(200).send(client);
  } catch (error) {}
};

// route for companies to get their clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.company?._id;
    const clients = await clientModel.find({ company_id: companyId });
    res.status(200).send(clients);
  } catch (error) {
    next(error);
  }
};
const editClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editClientInfo = await clientModel.findByIdAndUpdate(
      req.client?._id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(200).send(editClientInfo);
  } catch (error) {
    next(error);
  }
};
const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleteClientInfo = await clientModel.findByIdAndDelete(req.client?._id);
  res.status(200).send("Successfuly deleted");
};
export default {
  newClient,
  getClients,
  getClient,
  editClient,
  deleteClient,
};

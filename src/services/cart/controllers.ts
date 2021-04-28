import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { clientModel } from "../clients/schema";
import { cartModel } from "./schema";
import { errorMessage } from "../../types/errors";

const addProduct = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    console.log("hehe")
    if (!req.client) return;
    const addProduct = await cartModel.addProduct(
      req.client?._id,
      req.params.id
    );
    res.status(200).send({ succsess: true, productId: req.params.id });
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};

const removeProduct = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    const addProduct = await cartModel.removeProduct(
      req.client?._id,
      req.params.id
    );
    res.status(200).send({ succsess: true, productId: req.params.id });
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};

const calculateTotal = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    const cart = await cartModel.calculateTotal(req.client?._id);
    res.status(200).send(cart);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};

const getCartProducts = async(

 req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    const cart = await cartModel.find({clientId:req.client?._id}).populate("products");
    res.status(200).send(cart);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
}
const orderCart = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    if (!req.client) return;
    console.log("hi")
    const cart = await cartModel.findOneAndUpdate(
      {clientId:req.client._id},
      {
        products:[]
      },
      {
        new:true
      }
    );
  
    res.status(200).send(cart);
  } catch (error) {
    nex(new errorMessage(error.message, 500));
  }
};
export default { addProduct, removeProduct, calculateTotal,getCartProducts ,orderCart};

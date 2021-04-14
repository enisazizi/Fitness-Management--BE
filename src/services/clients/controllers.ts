import { clientModel } from "./schema";
import { Response, NextFunction } from "express";
import { authReq as Request } from "../../types/general";
import { FilterProducts } from "../../types/product";
import jwt from "../auth/jwt";
import { productModel } from "../products/schema";




const newClient = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const companyId = req.company?._id;
    console.log("company",req.body)
    const payload = req.body.payload;
    const newClient = new clientModel({
      ...req.body,
      company_id: companyId,
    });

    const { _id } = await newClient.save();
    const token = jwt.makePayment(_id, payload);
    if (token) {
      const addTokenPayment = await clientModel.findByIdAndUpdate(_id, {
        accessToken: token,
      });

      res.status(201).send(_id);
    }
  } catch (error) {
    console.log("catch error");
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

const addProductToClientCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (product) {
      const newProduct = { ...product.toObject(), quantity: req.body.quantity };

      const isProductThere = await clientModel.findProductInCart(
        req.params.clientId,
        req.params.productId
      );
      if (isProductThere) {
        await clientModel.incrementCartQuantity(
          req.params.clientId,
          req.params.productId,
          req.body.quantity
        );
        res.send("Quantinty incremendted");
      } else {
        await clientModel.addProductToCart(req.params.clientId, newProduct);
        res.send("New Product Added to cart");
      }
    }
  } catch (error) {
    next(error);
  }
};
const removeProductFromClientCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;

    const product = await productModel.findById(productId);
    if (product) {
      const isProductThere = await clientModel.findProductInCart(
        req.params.clientId,
        req.params.productId
      );
      if (isProductThere) {
        const correctProduct = await isProductThere.cart.find(
          (prod: any) => prod.product == req.params.productId
        );

        if (correctProduct.quantity > 1) {
          await clientModel.incrementCartQuantity(
            req.params.clientId,
            req.params.productId,
            req.body.quantity
          );
          console.log("isProductThere", isProductThere);
          res.send("Quantinty decremendted");
        } else {
          let client = await clientModel.findOne({ _id: req.params.clientId });
          if (client !== undefined && client !== null) {
            clientModel.removeFromCart(req.params.clientId, correctProduct);
            res.send(" Product deleted from cart");
          } else {
            throw new Error("Client is undefined");
          }
        }
      } else {
        throw new Error("This is bad no clue !");
      }
    }
  } catch (error) {
    next(error);
  }
};
const cartTotal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await clientModel.calculateCartTotal(req.params.id);
    res.send({ total });
  } catch (error) {
    next(error);
  }
};

const bodyWorkOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(...req.body.bodyWork);

    const editClientInfo = await clientModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { bodyWork: req.body.bodyWork },
      },
      { new: true }
    );
    res.send(editClientInfo);
  } catch (error) {
    next(error);
  }
};
export default {
  newClient,
  getClients,
  getClient,
  editClient,
  deleteClient,
  addProductToClientCart,
  removeProductFromClientCart,
  cartTotal,
  bodyWorkOut,
};

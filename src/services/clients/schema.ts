import { Schema, model } from "mongoose";
import {
  Client,
  ClientDoc,
  ClientDocument,
  ClientModel,
} from "../../types/client";
import bcrypt from "bcrypt";

const clientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  password: { type: String },
  username: { type: String, unique: true },
  accessToken: { type: String },
  cart: [
    {
      total: Number,
      product: { type: Schema.Types.ObjectId, ref: "Product" },

      quantity: { type: Number, default: 1 },
    },
  ],
  image: String,
});

clientSchema.pre("save", async function (this: ClientDoc, next: any) {
  if (this.password != undefined) {
    const validation = await clientModel.findOne({ username: this.username });

    if (!validation) {
      const checkPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //Check if pw has a number,lowercase and uppercase
      const validPw = this.password.match(checkPw);
      console.log(validPw);

      if (validPw) {
        const encryptedPassword = await bcrypt.hash(this.password, 8);
        this.password = encryptedPassword;
        this.username = this.username.toLowerCase();
        next();
      } else {
        const err = new Error();
        err.message = "THE PASSWORD YOU PROVIDED IS NOT A SAFE PASSWORD";
        next(err);
      }
    } else {
      const err = new Error();
      err.message = "USERNAME ALREADY EXISTS";
      next(err);
    }
  } else {
    const err = new Error();
    err.message = "PASSWORD MUST HAVE MORE THAN 8 CHARACTERS";
    next(err);
  }
});

//FINDS CLIENT BY USERNAME/EMAIL AND PASSWORD
clientSchema.statics.findByCred = async function (
  this: ClientDocument,
  username: string,
  password: string
) {
  try {
    let Client = await this.findOne({ username });
    if (!Client?.password) throw new Error("Client not found !");

    const doesMatch = await bcrypt.compare(password, Client.password);
    if (!doesMatch) {
      const err = new Error();
      err.message = "Unable to Login,check Crendetials";
      throw err;
    } else {
      const {
        name,
        password,
        username,
        accessToken,
        email,
        _id,
        image,
      } = Client;
      return Object.freeze({
        name,
        username,
        email,
        accessToken,
        _id,
        image,
      });
    }
  } catch (error) {
    error.mesage = "Exception while finding client";
    throw error;
  }
};

//CART MANOVER

clientSchema.statics.findProductInCart = async function (
  this: ClientDocument,
  id: string,
  productId: string
) {
  const isProduct = await this.findOne({
    _id: id,
    "cart.product": productId,
  });
  console.log("Isproduct func is returning :", isProduct);
  return isProduct;
};

clientSchema.statics.incrementCartQuantity = async function (
  this: ClientDocument,
  id: string,
  productdId: string,
  quantity: number
) {
  console.log(quantity);
  const product = await this.findOneAndUpdate(
    {
      _id: id,
      "cart.product": productdId,
    },
    { $inc: { "cart.$.quantity": quantity } }
  );
  // console.log("qitu duhet me hi",product)
};

clientSchema.statics.addProductToCart = async function (
  id: string,
  product: any
) {
  await clientModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { cart: { product: product } } }
  );
};
clientSchema.statics.removeFromCart = async function (
  id: string,
  product: any
) {
  console.log(product.product);
  await clientModel.findOneAndUpdate(
    { _id: id },
    { $pull: { cart: { product: product.product } } }
  );
};
clientSchema.statics.calculateCartTotal = async function (id: string) {
  const whatever = await clientModel.findById(id).populate([
    {
      path: "cart.product",
    },
  ]);
  if (whatever) {
    console.log(whatever, "-----");
    const total = whatever.cart
      .map(
        (product) =>
          parseInt(product.quantity) * parseInt(product.product.price)
      )
      .reduce((acc, el) => acc + el, 0);
    console.log(total);
    return whatever;
  }
};

export const clientModel = model<ClientDoc, ClientModel>(
  "Client",
  clientSchema
);

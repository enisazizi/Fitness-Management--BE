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
  surname: { type: String, required: true },
  email: { type: String },
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
    if (!Client?.password) return;
    const doesMatch = await bcrypt.compare(password, Client.password);
    if (!doesMatch) {
      const err = new Error();
      err.message = "Unable to Login,check Crendetials";
      throw err;
    }
    delete Client.password;

    return Client;
  } catch (error) {
    error.mesage = "Exception while finding client";
    throw error;
  }
};

//CART MANOVER



export const clientModel = model<ClientDoc, ClientModel>(
  "Client",
  clientSchema
);

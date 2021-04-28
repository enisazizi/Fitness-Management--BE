import { Schema, model } from "mongoose";
import {
  CartDoc,
  CartDocument,
  CartDocPopulated,
  CartDocumentPopulated,
  CartModel,
} from "../../types/cart";

const cartSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

cartSchema.statics.addProduct = async function (
  this: CartDocument,
  clientId: string,
  productId: string
): Promise<void> {
  try {
    const add = await this.updateOne(
      { clientId: clientId },
      { $push: { products: productId } }
    ).populate("products");
  } catch (error) {
    throw error;
  }
};

cartSchema.statics.removeProduct = async function (
  this: CartDocument,
  clientId: string,
  productId: string
): Promise<void> {
  try {
    const remove = await this.updateOne(
      { clientId: clientId },
      { $pull: { products: productId } }
    );
  } catch (error) {
    throw error;
  }
};

cartSchema.statics.calculateTotal = async function (
  this: CartDocumentPopulated,
  clientId: string
): Promise<any> {
  try {
    let cart = await this.findOne({ clientId }).populate("products");
    let total = 0;
    cart?.products.map((e: any) => {
      total += e.price;
    });

    const cartWithTotal = { ...cart, total };
    return cartWithTotal;
  } catch (error) {
    throw error;
  }
};

export const cartModel = model<CartDoc, CartModel>("Cart", cartSchema);

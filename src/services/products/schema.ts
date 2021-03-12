import {Schema,model} from "mongoose"

import {ProductDocument,ProductDoc} from "../../types/product"

const productSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image:{
        type:String,
        // required:true,
    },
    price:{
      type:Number,
      // required:true,
  }

  });

  export const productModel = model<ProductDoc>(
      "Product",
      productSchema
  )
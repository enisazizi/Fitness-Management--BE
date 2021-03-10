import {Document,Model} from "mongoose"
export interface Product {
    _id:string;
    name:string;
    description:string;
    brand:string;
    image:string;
}

export interface ProductDoc extends Document{
    _id:string;
    name:string;
    description:string;
    brand:string;
    image:string;
}

export type ProductDocument = Model<ProductDoc> 


export interface FilterProducts {
    product:string;
}
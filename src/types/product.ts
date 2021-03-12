import {Document,Model} from "mongoose"
export interface Product {
    _id:string;
    name:string;
    description:string;
    brand:string;
    image:string;
    price:number;
}

export interface ProductDoc extends Document{
    _id:string;
    name:string;
    description:string;
    brand:string;
    image:string;
    price:number;
}

export type ProductDocument = Model<ProductDoc> 


export interface FilterProducts {
    product:string;
}
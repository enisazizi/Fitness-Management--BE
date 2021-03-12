import {Document,Model} from "mongoose"

export interface Client {
    _id: string;
    name: string;
    email: string;
    username:string;
    password?: string;
    company_id:string;
    image?: string;
    product: string;
    cart:Array<any>
    
}

export interface ClientDoc extends Document{
    _id: string;
    name: string;
    username:string;
    email: string;
    company_id:string;
    password?: string;
    image?: string;
    product: string;
   cart:Array<any>
}
export type ClientDocument = Model<ClientDoc>

export interface ClientModel extends ClientDocument{
    findByCred(
        this: ClientDocument,
        email: string,
        password: string
      ): Promise<Client | undefined>;
}
export interface ClientModel extends ClientDocument{
    findProductInCart(
        this:ClientDocument,
        _id:string,
        product:any
    ):any;
    addProductToCart(
        this:ClientDocument,
        _id:string,
        product:any
    ):any
    incrementCartQuantity(
        this:ClientDocument,
        _id:string,
        product:any,
        quantity:number
    ):any

}
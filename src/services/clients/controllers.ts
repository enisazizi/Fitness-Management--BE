import {clientModel}  from "./schema"
import {Response,NextFunction} from "express"
import {authReq as Request} from "../../types/general"
import {FilterProducts} from "../../types/product"
import { productModel } from "../products/schema"


const newClient = async (req: Request,res:Response,next:NextFunction)=>{
    try {
        console.log("try")
            const companyId = req.company?._id
          const newClient = new clientModel({
             
              ...req.body,
              company_id:companyId
          })
          const {_id} = await newClient.save()
          res.status(201).send(_id)
  
    } catch (error) {
        console.log("catch error")
        next(error)
    }
}
const getClient = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const client = await clientModel.findById(req.params.id)
        res.status(200).send(client)
    } catch (error) {
        
    }
}

// route for companies to get their clients
const getClients = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const companyId = req.company?._id
        const clients = await clientModel.find({company_id:companyId})
         res.status(200).send(clients)
        
    } catch (error) {
        next(error)
    }
}
const editClient = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const editClientInfo = await clientModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:{...req.body}
            },
            { new:true }
        )
        res.status(201).send(editClientInfo)
    } catch (error) {
        next(error)
    }
}
const deleteClient = async(req:Request,res:Response,next:NextFunction)=>{
    const deleteClientInfo = await clientModel.findByIdAndDelete(req.params.id)
    res.status(200).send("Successfuly deleted")
}

const addProductToClientCart = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const productId= req.params.productId
        const product = await productModel.findById(productId)
        if(product){
            const newProduct = {...product.toObject(),quantity:req.body.quantity}
            
           
            const isProductThere = await clientModel.findProductInCart(
                req.params.clientId,
                req.params.productId     
                )
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
        next(error)
    }
}
const removeProductFromClientCart = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const productId= req.params.productId

        const product = await productModel.findById(productId)
        if(product){
      
            
           
            const isProductThere = await clientModel.findProductInCart(
                req.params.clientId,
                req.params.productId     
                )
                if (isProductThere) {
                    const correctProduct = await isProductThere.cart.find((prod:any) =>prod.product==req.params.productId)
                
                      if(correctProduct.quantity>1){
                        await clientModel.incrementCartQuantity(
                            req.params.clientId,
                            req.params.productId,
                            req.body.quantity
                          );
                          console.log("isProductThere",isProductThere)
                          res.send("Quantinty decremendted");
                      }else{
                        let client = await clientModel.findOne({_id:req.params.clientId})
                        if(client !==undefined && client !==null){
                         
                            await clientModel.removeFromCart(req.params.clientId, correctProduct);
                            res.send(" Product deleted from cart");
                        }else{
                            throw new Error("Client is undefined")
                        }
                      
                    //    await client?.save()
                    //    res.status(204).send(client)
                      }
                      
                    
                  } else {
                        throw new Error("This is bad no clue !")
                  }
        }  
    } catch (error) {
        next(error)
    }
}
const cartTotal = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const total = await clientModel.calculateCartTotal(req.params.id)
        res.send({total})
        
    }catch(error){
        next(error)
    }
}
export default {
    newClient,
    getClients,
    getClient,
    editClient,
    deleteClient,
    addProductToClientCart,
    removeProductFromClientCart,
    cartTotal,
  };
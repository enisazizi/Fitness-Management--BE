// import {Schema,model} from "mongoose"
// // import {
// //     Client,
// //     ClientDoc,
// //     ClientDocument,
// //     ClientModel,
// // } from "../../types/client"
// import bcrypt from "bcrypt"

// const clientSchema = new Schema ({

//     cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
// })

// clientSchema.pre<ClientDoc>("save",async function (next){
//     if(this.password != undefined){
//         const validation = await clientModel.findOne({email:this.email})

//         if (!validation) {
//             const checkPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //Check if pw has a number,lowercase and uppercase
//             const validPw = this.password.match(checkPw);
//             console.log(validPw);
      
//             if (validPw) {
//               const encryptedPassword = await bcrypt.hash(this.password, 8);
//               this.password = encryptedPassword;
//               this.email = this.email.toLowerCase();
//               next();
//             } else {
//               const err = new Error();
//               err.message = "THE PASSWORD YOU PROVIDED IS NOT A SAFE PASSWORD";
//               next(err);
//             }
//           } else {
//             const err = new Error();
//             err.message = "EMAIL ALREADY EXISTS";
//             next(err);
//           }
//         } else {
//           const err = new Error();
//           err.message = "PASSWORD MUST HAVE MORE THAN 8 CHARACTERS";
//           next(err);
//     }
// })
// clientSchema.static("findProductInCart",async function(id,productId){
   
//     const isProduct = await clientModel.findOne({
//         _id:id,
//         "cart.product":productId,
        
//     })
//     return isProduct
// })
// clientSchema.static("incrementCartQuantity",
//     async function (id,productdId,quantity){
//         console.log(quantity)
//      const product= await clientModel.findOneAndUpdate(
//             {
//                 _id:id,
//                 "cart.product":productdId,
//             },
//             {$inc:{"cart.$.quantity":quantity}}
//         )
//         console.log("qitu duhet me hi",product)
//     }
// )

// clientSchema.static("addProductToCart",async function(id,product){
  
//     await clientModel.findOneAndUpdate(
//         {_id:id},
//        { $addToSet:{cart:{product:product}}},
//     )
// })
// clientSchema.statics.findByCred = async function (
//     this:ClientDocument,
//     username:string,
//     password:string
// ){
//     try {
//         let Client = await this.findOne({username})
//         if(!Client?.password) throw new Error("Client not found !")

//         const doesMatch = await bcrypt.compare(password,Client.password)
//         if(!doesMatch){
//             const err = new Error()
//             err.message = "Unable to Login,check Crendetials"
//             throw err
//         }else{
//             const {
//                 name,
//                 password,
//                 username,
//                 email,
//                 _id,
//                 image,
//             }=Client
//             return Object.freeze({
//                 name,
//                 username,
//                 email,
//                 _id,
//                 image,
//             })
//         }


        
//     } catch (error) {
//         error.mesage="Exception while finding client"
//         throw error;
        
//     }
// }

// export const clientModel = model<ClientDoc,ClientModel>(
//     "Client",
//     clientSchema
// )
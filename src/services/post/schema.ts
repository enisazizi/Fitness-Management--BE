import {Schema,model} from "mongoose"
import {PostDoc} from "../../types/post"
const PostSchema = new Schema({
    image:{type:String},
    description:{type:String},
    client:{type:Schema.Types.ObjectId,ref:"Client"},
    // comments:[{type:Schema.Types.ObjectId,ref:"Comments"}],
    likes: [{ type: Schema.Types.ObjectId, ref: "Client" }],
    payNum :{type:Number},
    
}
,{timestamps:true}
)

export const postModel = model<PostDoc>(
    "Post",
    PostSchema)

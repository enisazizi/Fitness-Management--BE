import {Document,Model} from "mongoose"

export interface Post {
    _id: string;
    image:string;
    description:string;
    client:string;
    payNum:number;
    likes: string;
}

export interface PostDoc extends Document{
    _id: string;
    image:string;
    description:string;
    client:string;
    payNum:number;
    likes: string;
}

export type PostDocument = Model<PostDoc>


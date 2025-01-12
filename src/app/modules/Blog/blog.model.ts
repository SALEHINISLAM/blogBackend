import mongoose, { Schema, Types } from "mongoose";
import { TBlog } from "./blog.interface";

const BlogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

export const BlogModel = mongoose.model<TBlog>("Blog", BlogSchema)
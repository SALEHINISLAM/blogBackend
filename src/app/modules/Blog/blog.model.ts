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
        trim: true
    },
    author: {
        type: Types.ObjectId,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export const BlogModel = mongoose.model<TBlog>("Blog", BlogSchema)
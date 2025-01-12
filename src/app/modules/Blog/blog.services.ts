import mongoose, { ObjectId } from "mongoose";
import AppError from "../../errors/AppError";
import UserModel from "../user/user.model";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import httpStatus from "http-status"

const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const newBlog: TBlog = { ...payload };
        // blog must be unique and we judge it by there name. We assume that user me press twice or more to create blog. then it will be duplicate
        const isBlogExists = await BlogModel.findOne({ title: newBlog.title })
        if (isBlogExists) {
            throw new AppError(httpStatus.CONFLICT, "The blog title is already exists. Please change the title.")
        }
        const isUserExists = await UserModel.findOne({ email: userEmail, isBlocked: false })
        if (!isUserExists) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not found")
        }
        newBlog.author = isUserExists._id
        const result = await BlogModel.create([{...newBlog}],{session})
        await session.commitTransaction()
        await session.endSession()
        return result[0]
    } catch (error:any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    }

}

export const BlogServices = { createBlogIntoDB }
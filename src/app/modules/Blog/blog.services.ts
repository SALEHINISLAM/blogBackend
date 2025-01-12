import mongoose from "mongoose";
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
        const result = await BlogModel.create([{ ...newBlog }], { session })
        await session.commitTransaction()
        await session.endSession()
        return result[0]
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    }

}

const updateBlogIntoDB = async (payload: Partial<TBlog>, blogId: string, email: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const oldBlog = await BlogModel.findById(blogId).session(session)
        if (!oldBlog) {
            throw new AppError(httpStatus.NOT_FOUND, "Blog not found")
        }
        const user = await UserModel.findOne({ _id: oldBlog?.author, isBlocked: false, email: email })
        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to update it!")
        }
        // destructure updates
        const { title, content, ...remainingBlogData } = payload
        const modifiedUpdatedData: Record<string, unknown> = {
            ...remainingBlogData,
        };
        // Handle `title` updates
        if (title) {
            modifiedUpdatedData["title"] = title;
        }

        // Handle `content` updates
        if (content) {
            modifiedUpdatedData["content"] = content;
        }
        // Update the blog
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, modifiedUpdatedData, {
            new: true,
            session,
            runValidators: true,
        });
        if (!updatedBlog) {
            throw new AppError(httpStatus.NOT_FOUND, "Failed to update the blog");
        }
        await session.commitTransaction();
        await session.endSession()
        return updatedBlog;
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    }
}

const deleteBlogsFromDB = async (blogId: string, email: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const nonDeletedBlog = await BlogModel.findOne({ _id: blogId, isDeleted: false }).session(session)
        if (!nonDeletedBlog) {
            throw new AppError(httpStatus.NOT_FOUND, "Blog not found")
        }
        const user = await UserModel.findOne({ isBlocked: false, email: email }).session(session)
        if (user?._id.equals(nonDeletedBlog.author) || user?.role === 'admin') {
            // Update the blog
            const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { isDeleted: true,isPublished:false }, {
                new: true,
                session,
                runValidators: true,
            });
            if (!updatedBlog) {
                throw new AppError(httpStatus.NOT_FOUND, "Failed to delete the blog");
            }
            await session.commitTransaction();
            return updatedBlog;
        } else {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to delete it!")
        }
    } catch (error: any) {
        await session.abortTransaction()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    } finally {
        await session.endSession()
    }
}

const getAllBlogs = async (query: {
    search?: string, sortBy?: string, sortOrder?: string, filter?: string
}) => {
    const { search, sortBy, sortOrder, filter } = query
    const searchCriteria: any = {
        isDeleted:false,
        isPublished:true
    }
    const sortCriteria: any = {}
    //search by title or content
    if (search) {
        searchCriteria.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } }
        ];
    }
    //filter by author
    if (filter) {
        searchCriteria.author=filter
    }
    //sort criteria
    if (sortBy) {
        sortCriteria[sortBy]=sortOrder==="desc"? -1:1
    }

    //fetch blogs
    const blogs= await BlogModel.find(searchCriteria).sort(sortCriteria)

    return blogs
}

export const BlogServices = { createBlogIntoDB, updateBlogIntoDB, deleteBlogsFromDB,getAllBlogs }
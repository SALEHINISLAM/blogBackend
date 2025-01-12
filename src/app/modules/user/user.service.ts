import mongoose from "mongoose";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { BlogModel } from "../Blog/blog.model";

const createUserIntoDB = async (payload: TUser) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const isEmailExists = await UserModel.findOne({ email: payload?.email }).session(session)
        if (isEmailExists) {
            throw new AppError(400, "Validation error")
        }
        const result = await UserModel.create([{...payload}],{session})
        await session.commitTransaction()
        await session.endSession()
        return result
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error?.message)
    }
}

const blockUser = async (userId: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const user = await UserModel.findOne({ _id: userId, isBlocked: false })
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not Found")
        }
        else if (user?.role === "admin") {
            throw new AppError(httpStatus.UNAUTHORIZED, "You can't remove an admin")
        }
        await BlogModel.updateMany({ author: userId }, { isPublished: false,isDeleted:true }, { session })
        const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { upsert: false })
        session.commitTransaction()
        session.endSession()
        return result;
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error?.message)
    }

}

export const UserServices = { createUserIntoDB, blockUser }
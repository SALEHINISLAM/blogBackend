import mongoose from "mongoose";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const isEmailExists = await UserModel.findOne({ email: payload?.email })
        if (isEmailExists) {
            throw new AppError(400, "Validation error")
        }
        const result = await UserModel.create(payload)
        await session.commitTransaction()
        await session.endSession()
        return result
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User already exists")
    }
}

const blockUser = async (userId: string) => {
    const user = await UserModel.findOne({ _id: userId, isBlocked: false })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found")
    }
    else if (user?.role === "admin") {
        throw new AppError(httpStatus.UNAUTHORIZED, "You can't remove an admin")
    }
    const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { upsert: false })
    return result;
}

export const UserServices = { createUserIntoDB ,blockUser}
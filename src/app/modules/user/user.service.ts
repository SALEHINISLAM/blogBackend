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
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,"internal Server Error")
    }
}

export const UserServices = { createUserIntoDB }
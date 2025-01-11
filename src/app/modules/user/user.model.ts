import mongoose, { Schema, Document } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

// Define the schema based on the TUser type
const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

//hashing password in db
UserSchema.pre('save',async function (next) {
    const user=this;//doc
    user.password=await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
    next()
})

//don't show password in return result
UserSchema.post('save',function(doc,next){
    doc.password="",
    next()
})

// Create and export the model
const UserModel = mongoose.model<TUser>("User", UserSchema);
export default UserModel;

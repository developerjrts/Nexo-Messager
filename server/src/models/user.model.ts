import mongoose, { Document } from "mongoose";

export interface User extends Document {
    name: string,
    username: string,
    email: string,
    password: string,
    avatar?: string,
    bio: string,
    isVerified: boolean,
    isOnline: boolean,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        avatar: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: "",
            maxlength: 200
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isOnline: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }
);

const userModel = mongoose.model<User>("user", userSchema);

export default userModel
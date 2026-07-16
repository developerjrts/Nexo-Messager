import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

const userModel = mongoose.model("user", userSchema);

export default userModel
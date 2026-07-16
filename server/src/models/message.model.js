import { Types } from "mongoose";
import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    conversationId: {
        type: Types.ObjectId,
        ref: "conversation",
        required: true
    },
    senderId: {
        type: Types.ObjectId,
        ref: "user",
        required: true
    },
    readBy: {
        type: Types.ObjectId,
        ref: "user",
    },
    text: {
        type: String,
        ref: "user",
        required: true
    },
}, {
    timestamps: true
});

const messageModel = mongoose.model("message", messageSchema);

export default messageModel
import { Types } from "mongoose";
import mongoose, { Document } from "mongoose";

export interface Message extends Document {
    conversationId: Types.ObjectId,
    senderId: Types.ObjectId, 
    text: string,
    readBy: Types.ObjectId,
    createdAt: string,
    updatedAt: string
}

const messageSchema = new mongoose.Schema<Message >({
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

const messageModel = mongoose.model<Message >("message", messageSchema);

export default messageModel
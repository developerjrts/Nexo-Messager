import mongoose, { Document, Types } from "mongoose";

export interface Conversation extends Document {
    participants: Types.ObjectId[];
    lastMessage: Types.ObjectId,
    createdAt: string,
    updatedAt: string,
    isGroup: boolean,
    groupName?: string,
    groupAvatar?: string
    groupAdmin?: string
}

const conversationSchema = new mongoose.Schema<Conversation>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        trim: true
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }
}, {
    timestamps: true
});

const conversationModel = mongoose.model<Conversation>("conversation", conversationSchema);

export default conversationModel;

import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
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

const conversationModel = mongoose.model("conversation", conversationSchema);

export default conversationModel;

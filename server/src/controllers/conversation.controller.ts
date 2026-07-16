import type { Request, Response } from "express";
import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { io } from "../app.js";

export const createOrGetConversation = async(req:Request, res: Response): Promise<void> => {
    try {

        const userId = req.user.userId;
        const {receiverId} = req.body;

        console.log(req.body)

        if (!receiverId) {
            res.status(400).json({
                status: false,
                message: "Receiver ID is required."
            });
            return;
        };

        if (receiverId === userId) {
            res.status(400).json({
                status: false,
                message: "You can not create conversation with yourself."
            })
            return;
        };

        let conversation = await conversationModel.findOne({isGroup: false,
            participants: {
                $all: [userId, receiverId]
            }
        }).populate("participants")

        if (conversation) {
            res.status(200).json({
                status: true,
                conversation
            });
            return;
        }

        conversation = await conversationModel.create({
            participants: [userId, receiverId],
            isGroup: false
        })

        conversation = await conversation.populate("participants");

        res.status(200).json({
            status: true,
            conversation
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({
            status: false,
            message: "Server busy"
        })
    }
}


export const getConversations = async(req: Request, res: Response): Promise<void> => {
    try {

        const userId = req.user.userId;

        const conversations = await conversationModel.find({
            participants: userId
        }).populate("participants", "name avatar username").sort({ updatedAt: -1 } as any)

        if (!conversations) {
            res.status(404).json({
                status: false,
                message: "There are no conversations"
            })
        }
        
        res.status(200).json({
            status: true,
            conversations,
            userId
        })
        
    } catch (error) {
         console.log(error);
        res.status(501).json({
            status: false,
            message: "Server busy"
        })
    }
};


export const getConversationMessages = async(req: Request, res: Response): Promise<void> => {
    try {
        
        const userId = req.user.userId
        const {conversationId} = req.params;

        const messages = await messageModel.find({
            conversationId: conversationId
        } as any).populate("senderId", "name avatar").sort({ createdAt: 1 });

        if (!messages) {
            res.status(400).json({
                status: false,
                message: "There no messages yet."
            })
        }

        res.status(200).json({
            messages,
            userId
        })
    } catch (error) {
        console.log(error);
        
    }
}
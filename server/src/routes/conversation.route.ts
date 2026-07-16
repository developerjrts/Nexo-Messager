import express from "express";
import * as conversationController from "../controllers/conversation.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const conversationRouter = express.Router();

conversationRouter.route("/create").post(protect, conversationController.createOrGetConversation)
conversationRouter.route("/get-conversations").get(protect, conversationController.getConversations)
conversationRouter.route("/:conversationId/get-messages").get(protect, conversationController.getConversationMessages)


export default conversationRouter
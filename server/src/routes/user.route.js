import express from "express";
import * as userController from "../controllers/user.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/:username").get(protect, userController.getUserByUsername)

export default userRouter
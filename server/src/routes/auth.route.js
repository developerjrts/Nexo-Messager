import express from "express"
import * as authController from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const authRouter = express.Router();


authRouter.route("/sign-in").post(authController.signIn);
authRouter.route("/sign-up").post(authController.signUp);
authRouter.route("/request-email").post(protect, authController.requestVerificationMail);
authRouter.route("/verify-email").post(protect, authController.verifyMail);

export default authRouter;
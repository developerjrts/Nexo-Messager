import "dotenv/config";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protect = async(req, res, next) => {
    try {
        let token;

        if (req.cookies?.auth_session) {
            token = req.cookies.auth_session
        }
        

        if (!token && req.headers.authorization?.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            res.status(401).json({
                status: false,
                message: "Unauthorized, Please sign in."
            })
            return;
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);


        

        const user = await userModel.findById(decode.userId);

        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found."
            })
            return;
        };

        req.user = {
            userId: user._id.toString()
        };

        next()

    } catch (error) {
        console.log(error);
        
    }
}
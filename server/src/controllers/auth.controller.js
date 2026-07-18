import "dotenv/config"
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createAuthSession from "../config/auth.session.js";
import transporter from "../config/transporter.js"
import jwt from "jsonwebtoken";
import { verificationMail } from "../services/mail.services.js";

export const signIn = async(req, res) => {
    try {

        const {
            username, password
        } = req.body;

        if (!username || !password) {
            res.status(400).json({
                status: false,
                message: "Username and Password are required!"
            });
            return;
        };

        const user = await userModel.findOne({username}).select("+password");

        if (!user) {
            res.status(404).json({
                status: false,
                message: "Invalid username or password!"
            });
            return;
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

         if (!isPasswordCorrect) {
            res.status(401).json({
                status: false,
                message: "Invalid username or password!"
            });
            return;
        };

        const authSession = createAuthSession(user._id.toString())

        
        res.cookie("auth_session", authSession, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({
            status: true,
            message: "SignIn successful!",
            auth_session: authSession
        })


    } catch (error) {
        console.log(error);
        
    }
}

export const signUp = async(req, res) => {
    try {
        const {
            name, username, email, password, 
        } = req.body

        

        const isUsernameExists = await userModel.findOne({username});

        if (isUsernameExists) {
            res.status(501).json({
                status: false,
                message: "username is already exists!"
            })
            return;
        }

        const isEmailExists = await userModel.findOne({email});

        if (isEmailExists) {
            res.status(502).json({
                status: false,
                message: "email is already exists!"
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const fullName = name.replace(" ", "+")

        const avatar = `https://ui-avatars.com/api/?name=${fullName}&background=random`;

        const user = await userModel.create({
            username,
            name,
            email,
            password: hashPassword,
            avatar
        })

        const authSession = createAuthSession(user._id.toString())

        const sendMail = await verificationMail(email, authSession)

        console.log("4. Mail result:", sendMail);

        if (!sendMail) {
            res.status(400).json({
                status: false,
                message: "Failed to sent mail you can verify account later."
            });
            return;
        }

        res.cookie("auth_session", authSession, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" 
        })

        res.status(201).json({
            status: true,
            message: "Verification mail sent!",
            auth_session: authSession
        })

    } catch (error) {
        console.log(error);
        
    }
};

export const verifyMail = async(req, res) => {
    try {
        const {auth_session} = req.query;

        const decode = await jwt.verify(
            auth_session, 
            process.env.JWT_SECRET
        )

        const user = await userModel.findByIdAndUpdate(decode.userId, {
            isVerified: true
        })

        if (!user) {
            res.status(401).json({
                status: false,
                message: "Invalid session or user deleted."
            })
        }

        res.status(201).json({
            status: true,
            message: "Email verified."
        })
        

    } catch (error) {
        console.log();
    }
}
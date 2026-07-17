import "dotenv/config"
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createAuthSession from "../config/auth.session.js";

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
            sameSite: process.env.NODE_ENV === "production" ? "node" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" ? true : false
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

        const user = userModel.create({
            username,
            name,
            email,
            password: hashPassword,
            avatar
        })

        const authSession = createAuthSession((await user)._id.toString())

        res.cookie("auth_session", authSession, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "node" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" ? true : false
        })

        res.status(201).json({
            status: true,
            message: "User registered!",
            auth_session: authSession
        })




    } catch (error) {
        console.log(error);
        
    }
}
import "dotenv/config"
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createAuthSession from "../config/auth.session.js";
import transporter from "../config/transporter.js"
import jwt from "jsonwebtoken";

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
            httpOnly: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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
         res.status(500).json({
            status: false,
            message: error.message,
        })
   
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
            avatar,
        })
        
        const authSession = createAuthSession(user._id.toString())


        res.cookie("auth_session", authSession, {
            httpOnly: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" 
        })

        res.status(201).json({
            status: true,
            message: "User registered.",
            auth_session: authSession
        })

    } catch (error) {
        console.log(error);
         res.status(500).json({
            status: false,
            message: error.message,
        })
   
    }
};

export const requestVerificationMail = async(req, res) => {
    try {

        const userId = req.user.userId;

        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: 15 * 24 * 60 * 60 * 1000
        });

        const user = await userModel.findByIdAndUpdate(userId, {
            verificationToken: token
        });

       const mail = await transporter.sendMail({
                           from: "Nexo Messenger <noreply@jrts.dev>",
                           to: user.email,
                           subject: "Verification Mail",
                           html: `
                           <div style="
                           font-family: Arial, sans-sarif; max-width: 600px; padding: 10px; min-height: fit; margin: auto
                           ">
                           <h1>Hey, Hi👋 Welcome to Nexo Messanger</h1>
                           <p>Click the button to verify you mail adress!</p>
                          <a 
                               href="${process.env.CLIENT_URL}/verify-mail?verification_token=${token}"
                               style="
                               font-family: Arial, sans-sarif; width: fit; padding: 15px; border-radius: 5px; background-color: #6001d1; color: #FFF; text-decoration: none; font-weight: 700;">
                               Verify E-Mail
                           </a>
                           </div>
                           `
                       })

        if (mail) {
            res.status(200).json({
            status: true,
            message: "Mail sent"
        })
        return true
        }else {
            res.status(400).json({
            status: false,
            message: "Failed to send"
        })
        return false
        }

        
    } catch (error) {
          console.log(error);
         res.status(500).json({
            status: false,
            message: error.message,
        })
    
    }
}

export const verifyMail = async(req, res) => {
    try {
        const {verification_token} = req.query;
        const userId = req.user.userId

        const decode = await jwt.verify(
            verification_token, 
            process.env.JWT_SECRET
        )

        if (userId === decode.userId) {
            await userModel.findByIdAndUpdate(userId, {
                isVerified: true
            });
        };

       
        res.status(201).json({
            status: true,
            message: "Email verified."
        })
        

    } catch (error) {  
         console.log(error);
         res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}
import userModel from "../models/user.model.js";

export const getUserByUsername = async(req, res) => {
    try {
        
        const { username } = req.params
        const userId = req.user.userId

        const user = await userModel.findOne({username});

        if (!user) {
            res.status(404).json({
                message: "User not found.",
                status: false
            })
            return
        }

        const isUser = userId === user._id.toString() ? true : false

        res.status(200).json({
            status: true,
            user,
            userId,
            isUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Server busy"
        })
    }
}

export const getUsers = async(req, res) => {
    try {
        
        const userId = req.user.userId

        const users = await userModel.find();

        if (!users) {
            res.status(404).json({
                message: "Users not found.",
                status: false
            })
            return
        }

        res.status(200).json({
            status: true,
            users,
            userId
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Server busy"
        })
    }
}
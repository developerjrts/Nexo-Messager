import userModel from "../models/user.model.js";

export const getUserByUsername = async(req, res) => {
    try {
        
        const { username } = req.params

        const user = await userModel.findOne({username});

        if (!user) {
            res.status(404).json({
                message: "User not found.",
                status: false
            })
            return
        }

        res.status(200).json({
            status: true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Server busy"
        })
    }
}
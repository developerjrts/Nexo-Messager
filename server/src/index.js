import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import { io, server } from "./app.js"
import jwt from "jsonwebtoken";
import messageModel from "./models/message.model.js";
import conversationModel from "./models/conversation.model.js";
dotenv.config()

const port = process.env.PORT || 5000

io.on("connection", (socket) => {

    console.log(socket.id);
    

    socket.on("join-conversation", (data) => {
       socket.join(data)
       console.log(`This conversationId ${data} has joined chat `);
       
    })

    socket.on("send-message", async(data) => {
        let newMessage;
       try {
        const { conversationId, userId, text } = data

        newMessage = await messageModel.create({
            conversationId,
            senderId: userId,
            text
        });

        await conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: newMessage._id
        })

        await newMessage.populate("senderId", "name avatar")

       await io.to(newMessage.conversationId.toString()).emit("receive-message", newMessage)
        
    } catch (error) {
        console.log(error);
    }
    
    })

})


ConnectDB().then(() => {
    server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })
})

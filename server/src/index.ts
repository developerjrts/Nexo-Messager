import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import * as cookie from "cookie"
import { io, server } from "./app.js"
import jwt from "jsonwebtoken";
import messageModel from "./models/message.model.js";
import conversationModel from "./models/conversation.model.js";
dotenv.config()

const port: number = Number(process.env.PORT) || 5000


io.use((socket, next) => {
    const cookies = cookie.parseCookie(socket.handshake.headers.cookie || "")
    const token = cookies.auth_session

    if (!token) {
        return next(new Error("Unauthorized"))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!)

    socket.data.userId = (decode as any).userId

    next()

})

io.on("connection", (socket) => {

    console.log(socket.id);
    

    socket.on("join-conversation", (data) => {
       socket.join(data)
       console.log(`This conversationId ${data} has joined chat `);
       
    })

    socket.on("send-message", async(data): Promise<void> => {
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

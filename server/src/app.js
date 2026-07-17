import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser";
import {Server} from "socket.io"
import { createServer } from "http";
import router from "./routes/router.js";


const app = express(); 
const server = createServer(app)


app.use(cors({ 
  origin: "https://nexo-messager-flax.vercel.app", 
  credentials: true 
})); 

app.use(express.json()); 
app.use(cookieParser());


app.use("/api", router)
app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: `Requesting url: ${req.originalUrl} not found.`
    })
})



const io = new Server(server, {
  cors: {
    origin: "https://nexo-messager-flax.vercel.app",
  }
})

export {server, io};

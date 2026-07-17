import {io} from "socket.io-client"

const socket = io("https://nexo-messager.onrender.com")

export default socket
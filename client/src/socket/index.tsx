import { baseUrl } from "@/constants/url"
import {io} from "socket.io-client"

const socket = io(baseUrl)

export default socket
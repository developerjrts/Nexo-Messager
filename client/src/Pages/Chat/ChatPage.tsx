import ChatBubble from "@/Components/ChatBubble"
import TextField from "@/Components/TextField"
import { url } from "@/constants/url"
import socket from "@/socket"
import type { IMessage } from "@/Types/index"
import axios from "axios"
import { useEffect, useRef, useState, type SubmitEvent } from "react"
import { IoSend } from "react-icons/io5"
import { useParams } from "react-router-dom"

const ChatPage = () => {

  const lastMessageRef = useRef<HTMLDivElement >(null)

  const [text, setText] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [messages, setMessages] = useState<IMessage []>([])

  const {conversationId} = useParams()

  const sendMessage = (e: SubmitEvent) => {
    e.preventDefault();

    const newMessage = {
      text,
      userId,
      conversationId
    }

    socket.emit("send-message", (newMessage))

    setText("")
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data])
    })
  }, [])

  const getMessages = async(): Promise<void> => {
    try {
      const { data } = await axios.get(`${url}/conversation/${conversationId}/get-messages`, {
        withCredentials: true
      })

      console.log(data);
      

      setMessages(data.messages)
      setUserId(data.userId)

    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => { 
    getMessages()
  }, [conversationId])

  
  useEffect(() => {
    socket.emit("join-conversation", conversationId )
  }, [conversationId])


  return (
    <div className="h-[100%] flex flex-col justify-between">
     
     {
      messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
         <h1>There are no messages yet.</h1>
        </div>
      ) : (
         <div className="h-[89%] px-4 overflow-y-scroll">
       {
        messages.map((message, i ) => {
          return (
            <div key={i}>
            <ChatBubble message={message} isUser={userId === message.senderId._id ? true : false} />
            <div  ref={lastMessageRef} />
            </div>
          )
        })
       }
      </div>
      )
     }
     
      <form
      className="flex items-center justify-center h-[10%] px-2"
       onSubmit={(e) => sendMessage(e)}>
        <TextField
        className="w-full"
        
        placeholder="Say something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="bg-[#6001d1] p-2 md:p-4 rounded-full">
          <IoSend className="-rotate-12" />
        </button>
      </form>
    </div>
  )
}

export default ChatPage
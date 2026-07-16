import { url } from "@/constants/url";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";

export interface User {
  name: string,
  username: string,
  _id: string,
  avatar: string
}

interface Converasation {
  createdAt: string
  isGroup: boolean,
  participants: User[],
  updatedAt: string,
  _v: string,
  _id: string,
}

const UserContainer = () => {

  const {conversationId} = useParams()

  const [userId, setUserId] = useState<string | undefined>();
  const [conversations, setConversation] = useState<Converasation[]>([])

  const getConversations = async(): Promise<void> => {
    try {
      const {data} = await axios.get(`${url}/conversation/get-conversations`, {
        withCredentials: true
      })

      setConversation(data.conversations);
      // server may return userId at top-level
      setUserId(data.userId ?? undefined)
      

    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }
      
    }
  }

  useEffect(() => {
    getConversations();
  }, [])

  if (!conversations) {
    return (
      <div className="w-[100%] h-[100%]">
        <h1 className="font-semibold text-2xl">There are no conversation.</h1>
      </div>
    )
  }


  return (
    <div className="h-[100%] p-4 flex flex-col gap-4 w-[30%] bg-gray-500/5 rounded-xl">
      <h1 className="text-2xl font-semibold">
        Conversations
      </h1>
      {
        conversations.map((conversation, i) => {
          const otherUser = conversation.participants.find(
            (u) => u._id !== userId
          )

          return (
            <UserCard
             key={i} 
             user={otherUser}
              conversationId={conversation._id}
              isSelected={conversation._id === conversationId ? true : false }
               />
          )
        })
      }
    </div>
  )
}

export default UserContainer
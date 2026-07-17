import { url } from "@/constants/url";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "./UserCard";
import { Link, useParams } from "react-router-dom";
import Button from "@/Components/Button";

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
      setUserId(data.userId ?? undefined)

      console.log(data);
      

    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }
      
    }
  }

  useEffect(() => {
    getConversations();
  }, [  ])


  return (
    <div className="h-[100%] p-2 md:p-4 flex flex-col gap-4 w-full bg-gray-500/5 rounded-xl">
      <div className="flex gap-3">
        {
          conversations.map((conversation) => {
            const user = conversation.participants.find(
              (u) => u._id === userId
            )

            return (
              <Link to={`/user/${user?.username}`}>
                <img src={user?.avatar} alt="User Avatar" />
              </Link>
            )

          })
        }
        <h1 className="text-2xl font-semibold">
        Conversations
      </h1>
      </div>

      {
        conversations.length === 0 && (
          <div className="w-[100%] flex gap-4 text-center flex-col justify-center items-center h-[100%]">
        <h1 className="font-semibold text-2xl">There are no conversation.</h1>
        <h1>Some users present on Nexo Messanger</h1>
        <Button><Link to={"/users"}>Check users</Link></Button>
      </div>
        )
      }

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
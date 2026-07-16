import type { IMessage } from "@/Types"

interface props {
    message: IMessage,
    isUser: boolean
}

const ChatBubble = ({message, isUser}: props) => {
  return (
    <div
    className={`flex ${
        isUser ? "justify-end" : "justify-start"
    }`}
    >
        <div className={`flex flex-row
        max-w-[50%]
            ${
                isUser && "flex-row-reverse"
            }
            `}>
            
        <img src={message.senderId.avatar} className="w-10 h-10 rounded-full" />
    <div className={`px-4 relative py-2  w-fit m-1 rounded-2xl
        ${
            isUser ? " bg-secondary rounded-tr-none" : " bg-gray-500 rounded-tl-none"
        }
        `}>
            {message.text}
        </div>
        </div>
        </div>
  )
}

export default ChatBubble
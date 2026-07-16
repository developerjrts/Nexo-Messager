import { useParams } from "react-router-dom"

const ChatNav = () => {

    const {conversationId} = useParams()

  return (
    <div className="static top-0 h-[60px] z-10 w-full bg-transparent">{conversationId}</div>
  )
}

export default ChatNav
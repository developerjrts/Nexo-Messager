import { Link, useParams } from "react-router-dom"
import type { User } from "./UserContainer"


interface  props {
    user?: User,
    conversationId: string,
    isSelected: boolean
}

const UserCard = ({user, conversationId, isSelected}: props) => {

  return (
    <Link
    to={`/chat/${conversationId}`}
    className={`shadow cursor-pointer gap-2 hover:bg-blue-600/50 transition-all flex items-center rounded-xl p-3 ${
      isSelected ? "bg-secondary" : "bg-blue-600/10"
    }`}>
      <img
      src={user?.avatar}
      className="rounded-full w-10 h-10"
      />
      <div>
        <h1 className="font-bold text-lg">{user?.name}</h1>
        <h1>@{user?.username}</h1>
      </div>
    </Link>
  )
}

export default UserCard
import UserContainer from "@/Pages/Home/Components/UserContainer"
import { Outlet } from "react-router-dom"

const HomePageLayout = () => {
  return (
    <div className="flex h-screen p-10 gap-10">
        <UserContainer />
        <main className="w-[70%] bg-gray-500/5 rounded-xl"><Outlet /></main>
    </div>
  )
}

export default HomePageLayout
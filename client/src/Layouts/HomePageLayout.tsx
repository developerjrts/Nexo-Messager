import UserContainer from "@/Pages/Home/Components/UserContainer"
import { Outlet, useLocation } from "react-router-dom"

const HomePageLayout = () => {

  const location = useLocation()

  const isHome = location.pathname === "/"

  return (
    <div className="flex h-screen p-2 md:p-10 gap-10">
       <div className={`${
        isHome ? "block w-full" : "hidden" 
       } md:block md:w-[30%]`}>
         <UserContainer />
       </div>
        <main className={`${isHome ? "hidden" : "block w-full"} md:block md:w-[70%] bg-gray-500/5 rounded-xl`}><Outlet /></main>
    </div>
  )
}

export default HomePageLayout
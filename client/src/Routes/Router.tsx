// import MainLayout from "@/Layout/MainLayout"
import HomePageLayout from "@/Layouts/HomePageLayout"
import ChatPage from "@/Pages/Chat/ChatPage"
import Home from "@/Pages/Home/Home"
import SignIn from "@/Pages/SignIn/SignIn"
import SignUp from "@/Pages/SignUp/SignUp"
import UserPage from "@/Pages/UserPage/UserPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary text-white">
    <Routes>
        <Route
        element={<HomePageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:conversationId" element={<ChatPage />} />
        </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
            </div>
    </BrowserRouter>
  )
}

export default Router
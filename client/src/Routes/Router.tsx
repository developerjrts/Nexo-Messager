// import MainLayout from "@/Layout/MainLayout"
import Home from "@/Pages/Home/Home"
import SignIn from "@/Pages/SignIn/SignIn"
import SignUp from "@/Pages/SignUp/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary text-white">
    <Routes>
        {/* <Route
        element={<MainLayout />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
        {/* </Route> */}
    </Routes>
            </div>
    </BrowserRouter>
  )
}

export default Router
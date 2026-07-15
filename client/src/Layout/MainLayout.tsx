import Footer from "@/Components/Footer"
import Nav from "@/Components/Nav"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
    <Nav />
    <main>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default MainLayout
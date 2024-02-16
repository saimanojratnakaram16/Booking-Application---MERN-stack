import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
// import React from "react"

// interface Props {
//     children: React.ReactNode
// }

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <Hero/>
        {/* <div className="container mx-auto py-10 flex-1">
        {children}
        </div>    */}
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout

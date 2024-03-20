import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"
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
        <div className="flex flex-wrap mx-auto w-full justify-center md:w-3/4">
          <SearchBar/>
        </div>
        <div className="flex-1">
        <Outlet/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Layout

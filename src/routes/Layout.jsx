import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className={`flex-1 min-h-screen bg-gray-200 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}>
          <Outlet/>
        </main>
    </>
  )
}

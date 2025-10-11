import React from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
        <Navbar/>
        <main className='w-full min-h-screen bg-gray-200 space-y-4 pb-8'>
          <Outlet/>
        </main>
    </>
  )
}

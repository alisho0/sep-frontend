import { useState } from 'react'
import { Menu } from './pages/Menu'
import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function SepApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/menu' element={<Menu/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default SepApp

import { useState } from 'react'
import { Menu } from './pages/Menu'
import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Layout } from './routes/Layout'
import { Alumnos } from './pages/Alumnos'

function SepApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route element={<Layout />}>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/alumnos' element={<Alumnos />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default SepApp

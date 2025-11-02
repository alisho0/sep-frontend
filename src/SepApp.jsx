
import { Menu } from './pages/Menu'
import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './routes/Layout'
import { ModalGlobal } from './components/Modales/ModalGlobal'
import { Alumnos } from './features/alumnos/pages/Alumnos'
import { DetalleAlumno } from './features/alumnos/pages/DetalleAlumno'
function SepApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route element={<Layout />}>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/alumnos' element={<Alumnos />} /> 
            <Route path='alumnos/:id' element={<DetalleAlumno />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ModalGlobal />
    </>
  )
}

export default SepApp

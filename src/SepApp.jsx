
import { Menu } from './pages/Menu'
import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './routes/Layout'
import { ModalGlobal } from './components/Modales/ModalGlobal'
import { Alumnos } from './features/alumnos/pages/Alumnos'
import { DetalleAlumno } from './features/alumnos/pages/DetalleAlumno'
import { Discapacidades } from './features/discapacidad/pages/Discapacidades'
import { Grados } from './features/grados/pages/Grados'
import { GradoDetalle } from './features/grados/pages/GradoDetalle'
import { GradoCicloDetalle } from './features/grados/pages/GradoCicloDetalle'
import { Usuarios } from './features/usuarios/pages/Usuarios'
import { Configuracion } from './components/configuracion/Configuracion'
import { MenuMaestro } from './pages/MenuMaestro'
import { GradosAsignados } from './features/grados/pages/GradosAsignados'
function SepApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route element={<Layout />}>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/alumnos' element={<Alumnos />} /> 
            <Route path='/alumnos/:id' element={<DetalleAlumno />} />
            <Route path='/discapacidades' element={<Discapacidades />} />
            <Route path='/grados' element={<Grados/>}/>
            <Route path='/grados/:id' element={<GradoDetalle />} />
            <Route path='/grados/:id/ciclo/:cicloId' element={<GradoCicloDetalle />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/configuracion' element={<Configuracion />} />
            <Route path='/menu-maestro' element={<MenuMaestro/>} />
            <Route path='/grados-asignados' element={<GradosAsignados />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ModalGlobal />
    </>
  )
}

export default SepApp

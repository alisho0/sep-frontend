import { useDispatch, useSelector } from 'react-redux';
import { InputBuscarAlumno } from '../../alumnos/components/utils/InputBuscarAlumno';
import { BotonIcono } from '../../../utils/components/BotonIcono';
import { PlusIcon } from '@heroicons/react/16/solid';
import { useParams } from 'react-router-dom';
import { asignarAlumnoCiclo } from '../../../reducers/alumnosSlice';
import { showAlert } from '../../../utils/alert';
import { cerrarModal } from '../../../reducers/uiSlice';

export const ModalAgregarAlumno = () => {

  const dispatch = useDispatch();
  const { alumnos, alumnosCSG } = useSelector((state) => state.alumnos);
  const { modalData } = useSelector((state) => state.ui);

    const handleAgregarAlumno = async (alumnoId) => {
        console.log("Agregar alumno ID: ", alumnoId, " al ciclo ID: ", modalData.cicloId)
        try {
            const asignar = await dispatch(asignarAlumnoCiclo({idCiclo: modalData.cicloId, idAlumno: alumnoId}));
            if (asignarAlumnoCiclo.fulfilled.match(asignar)) {
                showAlert({
                    title: "Alumno agregado correctamente",
                    text: "El alumno se agregó al grado con éxito.",
                    icon: "success",
                })
                dispatch(cerrarModal());
            } else if (asignarAlumnoCiclo.rejected.match(asignar)) {
                throw new Error(asignar.error.message);
            }            
        } catch (error) {
            showAlert({
                title: "Error al agregar alumno",
                text: error.message || error || asignar.error?.message,
                icon: "error",
            })
        }
    }

  return (
    <>
        <div className='mb-4'>
            <h2 className='font-semibold text-xl'>Agregar alumno al grado</h2>
            <p className='text-sm text-gray-800'>Busca y selecciona un alumno para agregarlo al grado.</p>
        </div>
        <form>
            <InputBuscarAlumno />
            { Array.isArray(alumnos) && alumnos.length > 0 ? (
                <div className='max-h-60 overflow-y-auto mt-4'>
                    {alumnos.filter((a) => !alumnosCSG.some((aluCSG) => aluCSG.id === a.id)).map((alumno) => (
                        <div key={alumno.id} className="border rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors p-3 mb-2 flex md:justify-between md:items-center md:flex-row flex-col shadow-md gap-2">
                            <div>
                                <h4 className="font-semibold text-lg">{alumno.nombre} {alumno.apellido}</h4>
                                <p className="text-gray-700">{alumno.dni}</p>
                            </div>
                            <BotonIcono Icono={PlusIcon} className='bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors justify-center' onClick={() => handleAgregarAlumno(alumno.id)}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm italic text-gray-700 mt-4">
                    No hay alumnos disponibles
                </p>
            )}
        </form>
    </>
  )
}

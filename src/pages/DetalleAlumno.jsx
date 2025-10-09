import { useParams } from 'react-router-dom'
import { TutoresCard } from '../components/Alumnos/Detalle/TutoresCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { traerPorAlumnoId } from '../reducers/alumnosSlice';
import { aniosRegistros, detalleRegistro } from '../reducers/registrosSlice';

export const DetalleAlumno = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { alumno, loading } = useSelector((state) => state.alumnos);
    const { aniosDisponibles, registro } = useSelector((state) => state.registros);

    useEffect(() => {
        dispatch(traerPorAlumnoId({id, token}));
        dispatch(aniosRegistros({id, token}))
    }, [])

    useEffect(() => {
        if (aniosDisponibles && aniosDisponibles.length > 0) {
            dispatch(detalleRegistro({token, id: aniosDisponibles[0].id}));
        }
    }, [aniosDisponibles, token])

  return (
    <>
        <div className='container mx-auto md:px-28 px-4 pt-9 grid md:grid-cols-3 grid-cols-1 gap-6'>
            {loading ? (<p>Cargando...</p>) : (
                <>
                    <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-2'>
                        <div>
                            <h3 className='text-md font-semibold'>Información Personal</h3>
                            <p className='text-gray-600 text-sm'>Datos del alumno</p>
                        </div>
                        <div className='grid md:grid-cols-2 gap-6 mt-6'>
                            <div>
                                <label className='text-sm font-medium text-gray-600'>Nombre Completo</label>
                                <p className='font-medium'>{`${alumno?.nombre || ''} ${alumno?.apellido || ''}`}</p>
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-600'>DNI</label>
                                <p className='font-medium'>{alumno?.dni || ''}</p>
                            </div>
                            <div>
                                <label className='text-sm font-medium text-gray-600'>Domicilio</label>
                                <p className='font-medium'>{alumno?.domicilio || ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md border-gray-300'>
                        <div>
                            <h3 className='text-md font-semibold'>Tutores</h3>
                            <p className='text-gray-600 text-sm'>1 tutor(es) registrado(s)</p>
                        </div>
                        <div className='overflow-y-auto max-h-48'>
                            <TutoresCard />
                        </div>
                    </div>
                </>
            )}
            {/* Registro de Años */}
            <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-3'>
                <div className=''>
                    <h3 className='text-md font-semibold'>Registros y Observaciones</h3>
                    <p className='text-gray-600 text-sm'>Historial de observaciones por año lectivo</p>
                </div>
                <div className='mt-4 flex bg-indigo-600 w-fit rounded-lg p-1'>
                    {aniosDisponibles.map((anio) => (
                        <button key={anio.id} className='text-white px-3 py-2 rounded font-semibold cursor-pointer' onClick={() => console.log("Enviado")}>{anio.anio}</button>
                    ))}

                </div>
                
                <div>
                </div>
            </div>
        </div>
    </>
  )
}

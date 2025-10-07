import { useParams } from 'react-router-dom'
import { TutoresCard } from '../components/Alumnos/Detalle/TutoresCard';

export const DetalleAlumno = () => {

    const { id } = useParams();
    console.log(id);

  return (
    <>
        <div className='container mx-auto md:px-28 px-4 pt-9 grid md:grid-cols-3 grid-cols-1 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-2'>
                <div>
                    <h3 className='text-md font-semibold'>Información Personal</h3>
                    <p className='text-gray-600 text-sm'>Datos del alumno</p>
                </div>
                <div className='grid md:grid-cols-2 gap-6 mt-6'>
                    <div>
                        <label className='text-sm font-medium text-gray-600'>Nombre Completo</label>
                        <p className='font-medium'>Julian Alvarez</p>
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-600'>DNI</label>
                        <p className='font-medium'>12345678</p>
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-600'>Domicilio</label>
                        <p className='font-medium'>Av. Siempre Viva 742</p>
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
        </div>
    </>
  )
}

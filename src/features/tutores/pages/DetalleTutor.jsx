import React, { useEffect } from 'react'
import { InfoPersonalCard } from '../../alumnos/components/detalle/InfoPersonalCard'
import { useDispatch, useSelector } from 'react-redux'
import { traerTutorPorId } from '../../../reducers/tutoresSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export const DetalleTutor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        dispatch(traerTutorPorId(id));
    }, [dispatch, id])

    const { tutor, loading } = useSelector((state) => state.tutores);
    
    if (loading) {
        return <p className="text-gray-800">Cargando...</p>;
    }

    if (!tutor || !tutor.id) {
        return <p className="text-gray-800">Tutor no encontrado</p>;
    }
    
    return (
    <>
        <section className="container mx-auto px-4 pt-9 pb-14 flex flex-col gap-4">
            <button className="col-span-1 md:col-span-3 text-left flex gap-2 items-center hover:bg-indigo-700 hover:text-white w-fit py-1 px-2 rounded-lg transition-colors" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="w-5 h-5"/>
              <span className="font-semibold">Volver</span>
            </button>
            <InfoPersonalCard persona={tutor} isAlumno={false} />

            <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-2'>
                <h3 className="text-md font-semibold">Alumnos a cargo</h3>
                <p className="text-gray-800 text-sm">Listado de alumnos vinculados a este tutor</p>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-4'>
                    {tutor?.tutorDe?.length > 0 ? (
                        tutor.tutorDe.map((a, idx) => (
                            <div key={idx} className="border border-gray-300 rounded-lg p-4 bg-gray-100">
                                <p className="font-medium">{a}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 italic mt-3">No hay alumnos vinculados a este tutor</p>
                    )}
                </div>
            </div>
        </section>
    </>
  )
}

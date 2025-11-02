import { MagnifyingGlassIcon, MinusIcon } from '@heroicons/react/16/solid';
import { useDispatch, useSelector } from 'react-redux';
import { confirmationAlert, showAlert } from '../../../../utils/alert';
import { desvincularTutorDeAlumno } from '../../../../reducers/tutoresSlice';

export const TutoresCard = ({id}) => {

  const dispatch = useDispatch();
  const {tutoresAlumno} = useSelector((state) => state.tutores);
  const { alumno } = useSelector((state) => state.alumnos);

  const onEliminar = (idTutor) => {
    confirmationAlert({
      title: 'Eliminar',
      text: '¿Estás seguro de desvincular a este tutor?',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(desvincularTutorDeAlumno({idTutor, idAlumno: alumno.id}))
      }
    })
  }

  return (
    <>
    { tutoresAlumno.map((tutor, idx) => ( 
      <div className="flex gap-4 items-center border border-gray-300 rounded-lg p-4 bg-gray-100 hover:bg-gray-300 transition-colors mt-3" key={idx}>
        {/* <div>
          <UserIcon className="h-10 w-10 text-gray-400 bg-gray-200 rounded-full p-2 mb-2" />
        </div> */}
        <div className='flex flex-col w-full'>
          <div className='mb-3'>
            <p className="font-medium">{`${tutor.nombre || '-'} ${tutor.apellido}`}</p>
            <p className="text-gray-600 text-sm">DNI: {tutor.dni || '-'}</p>
          </div>
          <div className='bg-indigo-600 rounded-lg shadow-md flex'>
            <button className='hover:bg-indigo-700 w-full flex items-center justify-center px-2 py-1 rounded-l-lg hover:cursor-pointer transition-colors' onClick={() => onEliminar(tutor.id)}>
              <MinusIcon className='w-5 h-5 text-white'/>
            </button>
            <button className='hover:bg-indigo-700 w-full flex items-center justify-center px-2 py-1 rounded-r-lg hover:cursor-pointer transition-colors'>
              <MagnifyingGlassIcon className='w-5 h-5 text-white'/>
            </button>
          </div>
        </div>

      </div>
    )) }
    </>
  );
};

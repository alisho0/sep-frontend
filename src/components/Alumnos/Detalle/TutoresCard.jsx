import { UserIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';

export const TutoresCard = () => {

  const dispatch = useDispatch();
  const {tutores} = useSelector((state) => state.tutores);


  return (
    <>
    { tutores.map((tutor, idx) => ( 
      <div className="flex gap-4 items-center border border-gray-300 rounded-lg p-4 bg-gray-100 hover:bg-gray-300 transition-colors mt-3" key={idx}>
        <div>
          <UserIcon className="h-10 w-10 text-gray-400 bg-gray-200 rounded-full p-2 mb-2" />
        </div>
        <div>
          <p className="font-medium">{`${tutor.nombre || '-'} ${tutor.apellido}`}</p>
          <p className="text-gray-600 text-sm">DNI: {tutor.dni || '-'}</p>
        </div>
      </div>
    )) }
    </>
  );
};

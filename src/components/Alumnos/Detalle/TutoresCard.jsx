import { UserIcon } from '@heroicons/react/20/solid';

export const TutoresCard = () => {
  return (
    <div className="flex gap-4 items-center border border-gray-300 rounded-lg p-4 bg-gray-100 mt-3">
      <div>
        <UserIcon className="h-10 w-10 text-gray-400 bg-gray-200 rounded-full p-2 mb-2" />
      </div>
      <div>
        <p className="font-medium">Lucas Rodriguez</p>
        <p className="text-gray-600 text-sm">DNI: 87654321</p>
      </div>
    </div>
  );
};

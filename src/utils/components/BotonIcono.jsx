import { PlusIcon } from "@heroicons/react/16/solid";

export const BotonIcono = ({ texto, Icono = PlusIcon, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold rounded-lg py-2 px-3 cursor-pointer ${className}`}
    >
      <Icono className="h-5 w-5" />
      {texto ? <span>{texto}</span> : '' }
    </button>
  );
};

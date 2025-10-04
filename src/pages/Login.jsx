import React, { useState } from 'react'
import { FormLogin } from '../components/Login/FormLogin'
import { login } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert';

export const Login = () => {

    const camposLogin = [
        { label: 'Usuario', type: 'text', placeholder: 'Usuario', formData: 'username' },
        { label: 'Contraseña', type: 'password', placeholder: 'Contraseña', formData: 'password' },
    ]

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await login(formData.username, formData.password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken)
            navigate('/menu')
        } catch (error) {
            showAlert({ title: 'Error', text: 'Error al iniciar sesión', icon: 'error', confirmButtonText: 'Intentar de nuevo' })
        }
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className="max-w-md w-full mx-auto px-6 py-8 bg-white rounded-2xl border border-gray-300 shadow-md">
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
            
            <h2 className="text-2xl font-bold text-center text-indigo-600">Iniciar sesión</h2>

            {camposLogin.map((campo, idx) => (
                <div className="flex flex-col" key={idx}>
                    <label htmlFor={campo.label.toLowerCase()} className="text-sm font-medium text-gray-700 mb-1">{campo.label}</label>
                    <input
                        id={campo.label.toLowerCase()}
                        type={campo.type}
                        placeholder={campo.placeholder}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-100"
                        value={formData[campo.formData]}
                        onChange={(e) => setFormData({...formData, [campo.formData]: e.target.value})}
                    />
                </div>
            ))}

            <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 font-semibold"
            >
            Iniciar sesión
            </button>
        </form>
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import { FormLogin } from '../components/Login/FormLogin'
import { login } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await login(username, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken)
            navigate('/menu')
        } catch (error) {
            console.error('Error de login:', error);
            alert('Credenciales incorrectas');
        }
    }
  return (
    <>
        <div>    
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    </>
  )
}

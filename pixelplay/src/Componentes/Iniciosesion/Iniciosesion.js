import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Iniciosesion.css';

const Iniciosesion = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const mandarEnvio = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3001/api/iniciosesion", {
                username,
                password
            }, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("Mitoken")}`
                }
            });
            sessionStorage.setItem("Mitoken", response.data.username);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Usuario o contraseña incorrectos');
            } else {
                setError('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className='body'>
            <form onSubmit={mandarEnvio} className='formulario'>
                <h2>Iniciar Sesión</h2>
                <br/>
                <div className='contenedor'>
                    <span>Nombre de usuario: </span>
                    <input type="text" className='int' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
               
                <div className='contenedor'>
                    <span>Contraseña: </span>
                    <input type="password" className='int' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br/>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si hay uno */}
                <button type="submit" className='iniciosesion'>Iniciar sesión</button>
                <br/>
                <Link to="/Registro">¿No tienes una cuenta? Regístrate</Link>
            </form>
        </div>
    );
};

export default Iniciosesion;

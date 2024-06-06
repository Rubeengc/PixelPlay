import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import"./Registro.css"

const Registro = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/registro', {
                username,
                email,
                password
            });
            console.log(response.data); // Mensaje de confirmación del servidor
            navigate('/iniciosesion'); // Redirigir al usuario a la página de inicio de sesión después del registro
        } catch (error) {
            console.error('Error al registrar usuario:', error.response.data);
            setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className='body'>
           
            <form onSubmit={handleSubmit} className='formularioregistro' >
            <h2>Registro</h2>
                <div className='contenedor'>
                    <span>Nombre de usuario: </span><br/>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='contenedor'>
                    <span>Correo electrónico: </span><br/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='contenedor'>
                    <span>Contraseña: </span><br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='contenedor'>
                    <span>Confirmar contraseña: </span><br/>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <br/>
                <button type="submit" className='registro'>Registrarse</button>
                <br/>
                <Link to="/iniciosesion">¿Ya tienes una cuenta? Inicia sesión</Link>
            </form>
        </div>
    );
};

export default Registro;
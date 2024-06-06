import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Paginadetalle.css';

const Paginadetalle = ({ gameId }) => {
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(1);
    const [averageRating, setAverageRating] = useState(0);
    const token = sessionStorage.getItem("Mitoken");

    useEffect(() => {
        axios.get(`http://localhost:3001/api/games/${gameId}`)
            .then(response => {
                setGame(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching game details:", error);
                setIsLoading(false);
            });

        fetchReviews();
    }, [gameId]);

    useEffect(() => {
        calculateAverageRating();
    }, [reviews]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/games/${gameId}/reviews`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/reviews', { gameId: gameId, comment: newComment, rating: newRating, user: token }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchReviews();
            setNewComment('');
            setNewRating(1);
            window.location.reload(); 
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < rating ? "star filled" : "star"}>★</span>
                ))}
            </div>
        );
    };

    if (isLoading) return <div>Loading...</div>;
    if (!game) return <div>No se encontró el juego.</div>;

    return (
        <div className="general">
            <div className="columna-izq">
                <img src={game.cover_image_url} alt={game.title} className="caratula" />
                <div className="trailer">
                    <iframe 
                        src={`https://www.youtube.com/embed/${game.trailer_url}`} 
                        title="Game Trailer" 
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="columna-der">
                <h2>{game.title}</h2>
                <p className='descripcion'>{game.description}</p>
                {renderStars(averageRating)}
                <h3>Comentarios de Usuarios</h3>
                <ul>
                    {reviews.map(review => (
                        <li key={review.review_id} className="review">
                            <p>{review.comment}</p>
                            {renderStars(review.rating)}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className="review-form">
                    <label>
                        Comentario:
                        <textarea 
                            className='comentarios'
                            name="comment" 
                            value={newComment} 
                            onChange={(event) => setNewComment(event.target.value)}
                            placeholder="Escribe tu comentario aquí"
                        />
                    </label>
                    <label>
                        Valoración: 
                        <input 
                            className='valoracion'
                            type="number" 
                            name="rating" 
                            value={newRating} 
                            onChange={(event) => setNewRating(parseInt(event.target.value))}
                            min="1" 
                            max="5" 
                        />
                    </label>
                    <button type="submit">Enviar Comentario</button>
                </form>
            </div>
        </div>
    );
};

export default Paginadetalle;
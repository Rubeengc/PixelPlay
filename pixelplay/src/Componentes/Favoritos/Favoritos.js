import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import './Favoritos.css'; 
import { Link } from 'react-router-dom';

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const token = sessionStorage.getItem("Mitoken");

    useEffect(() => {
        // Fetch random games
        axios.get('http://localhost:3001/api/games/random')
            .then(response => setFavoritos(response.data))
            .catch(error => console.error(error));
        }, []); 

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="main-screen">
            <h2>Tus favoritos</h2>
            <Slider {...sliderSettings}>
                {favoritos.map(game => (
                    <div key={game.game_id} className="slider-item">
                        <Link to={`/games/${game.game_id}`}>
                            <img src={game.cover_image_url} alt={game.title} className="slider-image"/>
                        </Link>
                        <p className='titulo'>{game.title}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Favoritos;
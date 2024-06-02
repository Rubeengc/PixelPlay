import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import './Main.css'; 

const Main = () => {
    const [randomGames, setRandomGames] = useState([]);
    const [topRatedGames, setTopRatedGames] = useState([]);

    useEffect(() => {
        // Fetch random games
        axios.get('http://localhost:3001/api/games/random')
            .then(response => setRandomGames(response.data))
            .catch(error => console.error(error));
        
        // Fetch top-rated games
        axios.get('http://localhost:3001/api/games/top-rated')
            .then(response => setTopRatedGames(response.data))
            .catch(error => console.error(error));
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="main-screen">
            <h2>Destacados</h2>
            <Slider {...sliderSettings}>
                {randomGames.map(game => (
                    <div key={game.game_id} className="slider-item">
                        <img src={game.cover_image_url} alt={game.title} className="slider-image"/>
                        <p className='titulo'>{game.title}</p>
                    </div>
                ))}
            </Slider>

            <h2>Mejores Valorados</h2>
            <Slider {...sliderSettings}>
                {topRatedGames.map(game => (
                    <div key={game.game_id} className="slider-item">
                        <img src={game.cover_image_url} alt={game.title} className="slider-image"/>
                        <p className='titulo'>{game.title}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Main;

Create database Pixelplay;
use Pixelplay;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash)
VALUES 
('Pepe', 'pepe@gmail.com', '1234567890'),
('Jose', 'jose@gmail.com', 'hash2'),
('Iker', 'iker@gmail.com', 'hash3'),
('Ruben', 'ruben@gmail.com', 'hash4');

CREATE TABLE games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    cover_image_url VARCHAR(255),
    trailer_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO games (title, description, cover_image_url, trailer_url)
VALUES 
('Grand Thef Auto V', 'Es un videojuego de acción-aventura de mundo abierto desarrollado por el estudio escocés Rockstar North y distribuido por Rockstar Games. Este título revolucionario hizo su debut el 17 de septiembre de 2013 en las consolas Xbox 360 y PlayStation 3. ', 'https://im.ziffdavisinternational.com/ign_es/screenshot/r/rockstar-hace-publica-la-caratula-de-gta-5/rockstar-hace-publica-la-caratula-de-gta-5_e852.jpg', 'QkkoHAzjnUs'),
('Battlefield 1', 'El juego se ambienta en el periodo de la Primera Guerra Mundial, y está inspirado en eventos históricos. Los jugadores pueden usar armas de la Primera Guerra Mundial, incluyendo fusiles de cerrojo, fusiles automáticos y semiautomáticos, artillería, lanzallamas, y gas mostaza contra los enemigos.', 'https://uvejuegos.com/img/caratulas/56708/BF1-PC-B.jpg', 'c7nRTF2SowQ'),
('CS-GO', 'Es un juego de disparos en primera persona multijugador basado en objetivos. Dos equipos opuestos, los terroristas y los antiterroristas, compiten en modos de juego para completar objetivos repetidamente, como asegurar un lugar para colocar o desactivar una bomba y rescatar o capturar rehenes.', 'https://media.vandal.net/m/14871/20121215121814_1.jpg', 'edYCtaNueQY'),
('Rust', 'Es una aventura de acción y supervivencia en primera persona de corte sandbox en el que debemos colaborar con otros jugadores en un mundo persistente en el que el único objetivo es sobrevivir.', 'https://image.api.playstation.com/vulcan/ap/rnd/202103/1609/wBzFi5s20C1I7o3A5iEFWNuI.jpg', 'LGcECozNXEw'),
('PUBG', 'Es un shooter de estilo Battle Royale en el que 100 jugadores se enfrentan entre sí hasta que solo queda uno. Encuentra y saquea armas, vehículos y objetos en un campo de batalla que se reduce lentamente y supera a tus contrincantes para convertirte en «el último superviviente».', 'https://i.3djuegos.com/juegos/14758/playerunknown__039_s_battlegrounds/fotos/ficha/playerunknown__039_s_battlegrounds-3914769.jpg', 'OUeQjwzSbc4'),
('Infamous 2', 'Es un videojuego de acción y aventura de disparos en tercera persona de mundo abierto desarrollado por Sucker Punch Productions y publicado por Sony Computer Entertainment para la consola de videojuegos PlayStation 3. Es una secuela del videojuego inFAMOUS de 2009. Anunciado el 4 de junio de 2010, el juego fue lanzado el 7 de junio de 2011.', 'https://i.3djuegos.com/juegos/5166/infamous_2/fotos/ficha/infamous_2-1715256.jpg', 'k2DwtfbdYX4'),
('The Last of Us', 'De acuerdo con la trama de The Last of Us, en septiembre de 2013 se desata una pandemia en Estados Unidos ocasionada por una cepa del hongo Cordyceps, que al infectar a los humanos los convierte en criaturas caníbales, y que se transmite a través de una simple mordedura.', 'https://i.3djuegos.com/juegos/8274/last_of_us/fotos/ficha/last_of_us-2190366.jpg', 'Mel8DZBEJTo'),
('Slime Rancher', 'Slime Rancher es un juego de estilo “sandbox” en primera persona, rebosante de encanto. Encarna a Beatrix LeBeau, una joven ranchera muy aguerrida, que decide emprender una nueva a vida a años luz de la Tierra en el lugar más remoto. Cada día tiene sus propios problemas y oportunidades, mientras te esfuerzas por amasar una gran fortuna en el negocio de criar slimes. Colecciona slimes de todos los colores, recolecta recursos y explora una entorno salvaje gracias a tu versátil vacpack.', 'https://i.3djuegos.com/juegos/12722/slime_rancher/fotos/ficha/slime_rancher-4005319.jpg', 'oOL-dsa79Xs'),
('Ratchet & Clank 3', 'Es un juego de acción tridimensional en tercera persona con elementos de plataformas y disparos, en el que el jugador controla a Ratchet, un mecánico lombax, con un amplio arsenal de armas y artilugios, que lleva a su compañero Clank como mochila que le permite para hacer uso del Helipack y Aviopack.', 'https://media.vandal.net/m/28109/ratchet-clank-3-psn-20141231121729_1.jpg', 'LbqDl_4toNo'),
('Dying Light', 'Juego de supervivencia ambientado en un mundo abierto postapocalíptico cubierto de zombis hambrientos. Explora una ciudad arrasada por una misteriosa epidemia vírica. Busca suministros, fabrica armas y enfréntate a hordas de muertos.', 'https://uvejuegos.com/img/caratulas/51551/Dying_Light_flier.jpg', 'm_oSxlPzXFc'),
('Rocket League', 'Los jugadores controlan un coche propulsado por cohetes y lo utilizan para golpear una pelota mucho más grande que los coches hacia la portería del otro equipo para marcar goles, de una forma que se asemeja al fútbol sala, con elementos que recuerdan a un derbi de demolición. ​Los coches de los jugadores tienen la capacidad de saltar para golpear la pelota mientras están en el aire.', 'https://i.pinimg.com/originals/4e/ee/4a/4eee4a86594708690b7d65ebc5c2d697.jpg', 'OmMF9EDbmQQ'),
('Apex Legends', 'Apex Legends es el nuevo battle royale free to play de Respawn y EA ambientado en el universo futurista y de ciencia ficción de Titanfall. De esta manera, y para Xbox One, PS4 y PC, deberemos formar un grupo de asalto con otros usuarios y enfrentarnos en un enorme mapa contra 60 jugadores por ver quién se alza victorioso.', 'https://i.3djuegos.com/juegos/16414/apex_legends/fotos/ficha/apex_legends-4780765.jpg', 'nTKkOaxrF8A'),
('Fornite', 'Es un juego de tipo batalla real en el que compiten hasta cien jugadores en solitario, dúos, tríos o escuadrones. Los jugadores saltan de un autobús que cruza el mapa en el momento que deseen, y empiezan sin armas. Cuando aterrizan, deben buscar armas, objetos útiles y recursos, evitando que los maten mientras atacan a otros jugadores.', 'https://i.pinimg.com/736x/8f/16/e9/8f16e97ab5cc7873debc229c7a527a07.jpg', 'YRq7HdDhxjM'),
('World of tanks', 'World of Tanks es un juego multijugador en línea masivo con vehículos de combate de mediados del siglo XX. Únete a tanquistas de todo el mundo, participa en épicas batallas de tanques y lucha por la victoria.', 'https://i.3djuegos.com/juegos/5707/world_of_tanks/fotos/ficha/world_of_tanks-1717789.jpg', 'aK77QiRv_0w'),
('Warframe', 'Warframe es un juego de acción cooperativo free to play en tercera persona, donde encarnaremos a un miembro de Tenno, un grupo de antiguos guerreros que han despertado de su sueño criogénico para enfrentarse a la letal raza militarizada de los Grinner', 'https://i.3djuegos.com/juegos/8980/warframe/fotos/ficha/warframe-4728728.jpg', 'MsbL8lFHrZI'),
('Minecraft', 'Minecraft es un videojuego tipo sandbox, su traducción literal sería “caja de arena” y es lo que representa la experiencia de juego. Los jugadores pueden modelar el mundo a su gusto, destruir y construir, como si estuviesen jugando en una caja de arena.', 'https://s01.riotpixels.net/data/e7/f1/e7f1fad9-58db-4ee3-ac7e-dd0dc8e0d4d8.png/cover.minecraft.1024x1024.2014-04-24.420.png', 'MmB9b5njVbA'),
('Destiny 2', 'La facción de la Legión Roja de los Cabal, una raza extraterrestre basada en un imperio militar-industrial, han atacado La Última Ciudad con fuerzas abrumadoras, dirigidas por su comandante emperador y supremo líder de los cabal, Dominus Ghaul. Los guardianes han sido despojados de sus poderes otorgados por el viajero y obligados a huir de la torre. ', 'https://uvejuegos.com/img/caratulas/64643/Destiny-2.jpg', 'tiENQ-7FelY'),
('Payday 2', 'PAYDAY 2 es un juego de acción cooperativo para cuatro jugadores que, una vez más, permite a los jugadores ponerse en la piel del equipo original de PAYDAY - Dallas, Hoxton, Wolf y Chains - mientras descienden por Washington DC en una épica ola de crímenes.', 'https://s01.riotpixels.net/data/37/d2/37d2df79-4286-4c11-95fa-8bd24acddb6b.jpg/cover.payday-2.1024x1024.2014-04-24.132.jpg', 'h1M-J6tFaZk'),
('A Way Out', 'A Way Out es un videojuego de acción-aventura jugado desde la perspectiva de tercera persona. Está diseñado para ser jugado en cooperativo a pantalla partida, lo que significa que debe ser jugado con otro jugador tanto en línea como local. En el juego, los jugadores controlan a Leo y Vincent, dos convictos que escapan de prisión y deben evitar a las autoridades.', 'https://uvejuegos.com/img/caratulas/59241/waypc.jpg', '_ApSmPvxz1o'),
('Left 4 Dead', 'Ambientado durante los inicios de un brote de zombis en la Costa Este de los Estados Unidos, el juego enfrenta a sus cuatro protagonistas — conocidos como los "sobrevivientes" — contra las hordas de infectados, intentando encontrar una manera de escapar de esta pandemia apocalíptica.', 'https://i.ebayimg.com/thumbs/images/g/q2EAAOSwwQNlgrrE/s-l1200.jpg', 'HfaGBwedwso');


CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO sections (name)
VALUES 
('Free for All'),
('PvP'),
('Co-op'),
('1 Player');



CREATE TABLE game_sections (
    game_id INT,
    section_id INT,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE CASCADE
);

INSERT INTO game_sections (game_id, section_id)
VALUES 
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 4),
(7, 4),
(8, 4),
(9, 4),
(10, 4),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 3),
(17, 3),
(18, 3),
(19, 3),
(20, 3);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    game_id INT,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 0 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

INSERT INTO reviews (user_id, game_id, rating, comment)
VALUES 
(1, 1, 5, '¡Un juego increible!'),
(2, 2, 4, 'Muy buen juego, pero con algun bug.'),
(3, 3, 3, 'Es un juego mediocre.'),
(4, 4, 5, 'Encantado con este videojuego!'),
(1, 5, 2, 'No es de mi agradado este juego.'),
(2, 6, 4, 'En general ,es un buen juego.'),
(3, 7, 5, '¡Obra maestra!'),
(4, 8, 3, 'Podria ser mejor, no esta mal.'),
(1, 9, 4, 'Lo disfrute un monton pero le faltan horas de juego.'),
(2, 10, 5, 'Fantastic!'),
(3, 11, 5, 'Amazing game!'),
(4, 12, 4, 'Great game, but a few bugs.'),
(1, 13, 3, 'It was okay.'),
(2, 14, 5, 'Loved it!'),
(3, 15, 2, 'Not my type.'),
(4, 16, 4, 'Pretty good overall.'),
(1, 17, 5, 'Masterpiece!'),
(2, 18, 3, 'Could be better.'),
(3, 19, 4, 'Enjoyed it a lot.'),
(4, 20, 5, 'Fantastic!');

CREATE TABLE favorites (
    user_id INT,
    game_id INT,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

INSERT INTO favorites (user_id, game_id)
VALUES 
(1, 1),
(1, 2),
(1, 7),
(1, 12),
(1, 16),
(2, 3),
(2, 4),
(2, 6),
(2, 8),
(2, 9),
(3, 10),
(3, 14),
(3, 13),
(3, 11),
(3, 15),
(4, 16),
(4, 13),
(4, 18),	
(4, 19),
(4, 20);


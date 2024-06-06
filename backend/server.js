const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Pixelplay'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Ruta para obtener juegos aleatorios
app.get('/api/games/random', (req, res) => {
    const query = 'SELECT game_id, title, cover_image_url FROM games ORDER BY RAND() LIMIT 5';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener juegos mejor valorados
app.get('/api/games/top-rated', (req, res) => {
    const query = `SELECT g.game_id, g.title, g.cover_image_url 
                   FROM games g 
                   JOIN (SELECT game_id, AVG(rating) as avg_rating 
                         FROM reviews 
                         GROUP BY game_id) r 
                   ON g.game_id = r.game_id 
                   ORDER BY r.avg_rating DESC 
                   LIMIT 5`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener detalles de un juego
app.get('/api/games/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    console.log("gameId recibido:", gameId);
    const query = 'SELECT * FROM games WHERE game_id = ?';
    db.query(query, [gameId], (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Juego no encontrado');
            }
        }
    });
});

// Ruta para obtener reseñas de un juego
app.get('/api/games/:gameId/reviews', (req, res) => {
    const gameId = req.params.gameId;
    console.log("gameId recibido para reviews:", gameId);
    const query = 'SELECT * FROM reviews WHERE game_id = ?';
    db.query(query, [gameId], (err, results) => {
        if (err) {
            console.error("Error en la consulta de reviews:", err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Ruta para agregar un comentario y valoración a un juego
app.post('/api/reviews', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado Authorization
    const { gameId, comment, rating } = req.body;

    // Decodificar el token para obtener el nombre de usuario
    const username = decodeToken(token);

    // Consultar la base de datos para obtener el ID del usuario
    const getUserIdQuery = 'SELECT user_id FROM users WHERE username = ?';
    db.query(getUserIdQuery, [username], (err, results) => {
        if (err) {
            console.error('Error al obtener el ID del usuario:', err);
            return res.status(500).send('Error al obtener el ID del usuario');
        }

        const userId = results[0].user_id;

        const checkUserQuery = 'SELECT user_id FROM users WHERE username = ?';
        db.query(checkUserQuery, [userId], (checkUserErr, checkUserResults) => {
            if (checkUserErr) {
                console.error('Error al verificar el usuario:', checkUserErr);
                return res.status(500).send('Error al verificar el usuario');
            }
        
            if (checkUserResults.length === 0) {
                return res.status(404).send('Usuario no encontrado');
            }
        
            const user_id = checkUserResults[0].user_id;
        
            // Ahora que tenemos el user_id, podemos insertar el comentario en la tabla de reviews
            const insertQuery = 'INSERT INTO reviews (user_id, game_id, comment, rating) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [user_id, gameId, comment, rating], (insertErr, insertResults) => {
                if (insertErr) {
                    console.error('Error al enviar el comentario:', insertErr.sqlMessage);
                    return res.status(500).send(`Error al enviar el comentario: ${insertErr.sqlMessage}`);
                }
                res.status(201).send('Comentario enviado correctamente');
            });
        });
    });
});


// Ruta para obtener detalles de un usuario
app.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT username FROM users WHERE user_id = ?';
    db.query(query, userId, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        }
    });
});


const iniciosesionUser = (username, password) => {
    return new Promise((resolve, reject) => {
        // Realiza una consulta a la base de datos para encontrar el usuario con el nombre de usuario dado
        db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                reject(error); 
            } else {
                if (results.length === 0) {
                    reject('Usuario no encontrado'); 
                } else {
                    const user = results[0];
                    if (password === user.password_hash) {
                        resolve(user);
                    } else {
                        reject('Contraseña incorrecta');
                    }
                }
            }
        });
    });
};

app.post('/api/iniciosesion', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await iniciosesionUser(username, password);
        res.json({ username: user.username }); 
    } catch (error) {
        res.status(401).json({ message: error }); 
    }
});


// Función para crear un nuevo usuario
const crearUsuario = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // Guarda el usuario con el nombre de usuario, correo electrónico y contraseña en la base de datos
        db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                reject(error); 
            } else {
                resolve(results);
            }
        });
    });
};

app.post('/api/registro', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await crearUsuario(username, email, password);
        console.log('Contraseña ingresada:', password);
                    console.log('usuario introducido:', username);
                    console.log('usuario introducido:', email);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
app.post('/api/favoritos/:gameId', authenticate, (req, res) => {
    const { gameId } = req.body;
    const userId = req.userId;
    
    const favorite = { userId, gameId };
    favorites.push(favorite);
    res.status(201).send('Juego añadido a favoritso');
});

// Endpoint para borrar un juego de favoritos
app.delete('/api/favorites/:gameId', authenticate, (req, res) => {
    const { gameId } = req.params;
    const userId = req.userId;

    const index = favorites.findIndex(fav => fav.userId === userId && fav.gameId === gameId);
    if (index !== -1) {
        favorites.splice(index, 1);
        res.status(200).send('Juego borrado de favoritos');
    } else {
        res.status(404).send('Juego no encontrado');
    }
});
// Endpoint para obtener un juego de favoritos
app.get('/api/favoritos', authenticate, (req, res) => {
    const { gameId } = req.params;
    const userId = req.userId;

    const isFavorite = favorites.some(fav => fav.userId === userId && fav.gameId === gameId);
    res.status(200).json({ isFavorite });
});
// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


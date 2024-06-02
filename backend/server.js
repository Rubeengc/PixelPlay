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

// Obtener juegos aleatorios
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

// Obtener juegos mejor valorados
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

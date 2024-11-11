const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username already exists
    const checkUserQuery = `SELECT * FROM users WHERE username = ?`;
    db.query(checkUserQuery, [username], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
  
      if (results.length > 0) {
        // User already exists
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // If user does not exist, insert new user
      const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
      db.query(insertQuery, [username, password], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
  
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });

// Endpoint to fetch registered users
app.get('/users', (req, res) => {
    db.query('SELECT username, password FROM Users', (err, results) => {
      if (err) {
        res.status(500).send({ error: 'Error fetching users' });
      } else {
        res.send(results);
      }
    });
  });
  

app.listen(3001, () => console.log('Server running on port 3001'));

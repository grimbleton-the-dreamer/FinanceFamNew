"use strict";
/*
import express = require('express');
import bodyParser = require('body-parser');
import pool from './server'; // Import the pool from server.ts

const app = express();
app.use(bodyParser.json());

// API Endpoint to fetch all users
app.get('/api/users', (req: express.Request, res: express.Response): void => {
  pool.query('SELECT * FROM users')
    .then(result => res.json(result.rows)) // Send users as JSON
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// API Endpoint to fetch a user by ID
app.get('/api/users/:id', (req: express.Request, res: express.Response): void => {
  pool.query('SELECT * FROM users WHERE userID = $1', [req.params.id])
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]); // Send user as JSON
    })
    .catch(err => {
      console.error('Error fetching user by ID:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    });
});

// Start the server
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

*/ 

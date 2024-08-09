const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// Get all users
router.get('/', (req, res) => {
  knex('users').select('id', 'username', 'first_name', 'last_name')
    .then(users => {
      console.log('Users are being retrieved:', users);
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to retrieve user data' });
    });
});

// Get a single user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  knex('users').where({ id }).select('id', 'username', 'first_name', 'last_name').first()
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to retrieve user' });
    });
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  knex('users').insert(newUser)
    .returning(['id', 'username', 'first_name', 'last_name'])
    .then(([user]) => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to create user' });
    });
});

// Update an existing user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  knex('users').where({ id }).update(updatedUser)
    .returning(['id', 'username', 'first_name', 'last_name'])
    .then(([user]) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to update user' });
    });
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  knex('users').where({ id }).del()
    .then(count => {
      if (count > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to delete user' });
    });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);  // Log the incoming credentials

  knex('users').where({ username }).first()
    .then(user => {
      if (!user) {
        console.log('User not found:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      console.log('Found user:', user);  // Log the user data retrieved from the database

      if (user.password !== password) {  // Compare the password
        console.log('Password does not match for user:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // If username and password match, send a success response
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    })
    .catch(error => {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;

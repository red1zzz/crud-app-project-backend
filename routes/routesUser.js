const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// Note: Get all users
router.get('/', (req, res) => {
  knex('users').select('id', 'username', 'first_name', 'last_name')
    .then(users => {
      console.log('users are being retrieved', users)
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({error: 'Unable to retrieve user data'})
    })
});

// Note: Get user by id
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

// Note: Create new user
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

// Note: Update user
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

// Note: Delete user
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

module.exports = router;
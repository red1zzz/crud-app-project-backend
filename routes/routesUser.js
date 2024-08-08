const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

router.get('/', (req, res) => {
  knex('users').select('id','username', 'first_name', 'last_name')
  .then(users => {
    console.log('users is being retrieved', users)
    res.json(users);
  })
  .catch(error => {
    res.status(500).json({error: 'Unable to retrieve user data'})
  })
});


module.exports = router;
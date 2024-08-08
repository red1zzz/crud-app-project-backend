const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);






router.get('/', (req, res) => {
  knex('items').select('*')
  .then(items => {
    res.json(items);
  })
  .catch(error => {
    res.status(500).json({error: 'Unable to retrieve items'})
  })
});

module.exports = router;
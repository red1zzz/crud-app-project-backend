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
      res.status(500).json({ error: 'Unable to retrieve items' });
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  knex('items').where({ id }).first()
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to retrieve item' });
    });
});

module.exports = router;

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

router.post('/', (req, res) => {
  const newItem = req.body;
  knex('items').insert(newItem)
    .returning('*')
    .then(([item]) => {
      res.status(201).json(item);
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to create item' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  knex('items').where({ id }).update(updatedItem)
    .returning('*')
    .then(([item]) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to update item' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  knex('items').where({ id }).del()
    .then(count => {
      if (count > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Unable to delete item' });
    });
});

module.exports = router;
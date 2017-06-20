const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const routePath = path.join(__dirname, '../library.json')

const knex = require('../db/knex')

router.get('/', async(req, res, next) => {
  const books = await knex('books');
  const readable = JSON.stringify(books);
  res.render('pages/index', {
    drinks: 'drinks',
    books: books
  });
});

router.get('/books', async(req, res, next) => {
  knex('books')
    .orderBy('id')
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err)
    });
});

module.exports = router

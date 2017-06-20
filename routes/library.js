const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const routePath = path.join(__dirname, '../library.json')

const db = require('../db/knex')

router.get('/', async(req, res, next) => {
  const books = await db('books');
  const readable = JSON.stringify(books);
  res.render('pages/index', {
    drinks: 'drinks',
    books: books
  });
});

module.exports = router

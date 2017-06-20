const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const routePath = path.join(__dirname, '../library.json')

const knex = require('../db/knex')

router.get('/', async(req, res, next) => {
  res.render('pages/index');
});

// BOOKS
router.get('/books', async(req, res, next) => {
  knex('books')
    .then((books) => {
      res.render('pages/books', {
        books: books
      });
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/books/:id', async(req, res, next) => {
  let id = req.params.id;
  knex('books')
    .then((books) => {
      res.render('pages/book', {
        book: books[id - 1]
      });
    })
    .catch((err) => {
      next(err)
    });
});

// AUTHORS
router.get('/authors', async(req, res, next) => {
  var authors
  knex('authors').select()
    .then((ret) => {
      authors = ret
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').then((join) => {
        res.render("pages/authors", {
          authors: authors,
          join: join
        })
      })
    })
    .catch((err) => {
      next(err)
    });
});

// router.get("/schools",function(req,res){
//   var schools
//   knex("schools").select().then(function(ret){
//     schools=ret
//     return knex("students").select()
//   }).then(function(students){
//     res.render("schools",{
//       students: students,
//       schools: schools
//     })
//   })
// })

// get authors
// get authors/id
// get books/new
// get authors/new
// get books/id/edit
// get authors/id/edit
// get books/id/delete
// get authors/id/delete

// post books/new
// post authors/new

// put books/id/edit
// put authors/id/edit

// delete books/id/delete
// delete authors/id/delete



module.exports = router

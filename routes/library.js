const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const routePath = path.join(__dirname, '../library.json')
const bodyParser = require('body-parser');

const knex = require('../db/knex')

router.get('/', async(req, res, next) => {
  res.render('pages/index');
});

// BOOKS
router.get('/books/new', async(req, res, next) => {
  res.render("pages/books_new")
});

router.post('/books/new', async(req, res, next) => {
  let book
  knex('books').insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    book_cover_url: req.body.url
  }, '*').then((ret) => {
    book = ret[0];
    return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
      res.render("pages/book", {
        book: book,
        join: join
      })
    })
  }).catch((err) => {
    next(err)
  })
});


router.get('/books', async(req, res, next) => {
  var books
  knex('books').orderBy('id', 'asc').then((ret) => {
      books = ret
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
        res.render("pages/books", {
          books: books,
          join: join
        })
      })
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/books/:id', async(req, res, next) => {
  let id = req.params.id;
  var books
  knex('books')
    .then((ret) => {
      books = ret
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
        res.render("pages/book", {
          book: books[id],
          join: join
        })
      })
    })
    .catch((err) => {
      next(err)
    });
});


router.get('/book/:id/edit', async(req, res, next) => {
  let id = req.params.id;
  console.log(id, 'id');
  knex('books').where('id', id)
    .then((ret) => {
      book = ret[0]
      console.log(book, 'book at id');
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
        res.render("pages/book_edit", {
          book: book,
          join: join
        })
      })
    })
    .catch((err) => {
      next(err)
    });
});


router.post('/book/:id/edit', async(req, res, next) => {
  console.log('got here');
  let id = req.params.id;
  console.log(id, 'id');
  let book
  knex('books').where('id', id).update({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    book_cover_url: req.body.book_cover_url
  }, '*').then((ret) => {
    book = ret[0];
    console.log(book, 'book');
    return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
      res.render("pages/book", {
        book: book,
        join: join
      })
    })
  }).catch((err) => {
    next(err)
  })
});

// AUTHORS
router.get('/authors', async(req, res, next) => {
  var authors
  knex('authors').select()
    .then((ret) => {
      authors = ret
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
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


router.get('/authors/new', async(req, res, next) => {
  res.render("pages/authors_new")
});

router.post('/authors/new', async(req, res, next) => {
  let author
  knex('authors').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  }, '*').then((ret) => {
    author = ret[0];
    return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
      res.render("pages/author", {
        author: author,
        join: join
      })
    })
  }).catch((err) => {
    next(err)
  })
});


router.get('/authors/:id', async(req, res, next) => {
  let id = req.params.id;
  var authors
  knex('authors').select()
    .then((ret) => {
      authors = ret
      return knex("authors").join('books_authors', 'authors.id', 'books_authors.authors_id').join('books', 'books.id', 'books_authors.books_id').then((join) => {
        res.render("pages/author", {
          author: authors[id - 1],
          join: join
        })
      })
    })
    .catch((err) => {
      next(err)
    });
});




// get authors X
// get authors/id X
// get books X
// get books/id X


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

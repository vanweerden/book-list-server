'use strict'
module.exports = (app) => {
  const books = require('../controllers/book.controller.js');

  // Create new book
  app.post('/books', books.create);

  // Retrieve all books
  app.get('/books', books.getAll);

  // Retrieve single note with id
  app.get('/books/:id', books.getOne)

  // Update book with id
  app.put('/books/:id', books.update);

  // Delete book with id
  app.delete('/books/:id', books.delete);
}

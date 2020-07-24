// CRUD functions for routes in app/routes/book.routes.js
'use strict'
const connection = require('../../server.js');

// GET all books: sent as array of JSON objects
exports.getAll = (req, res, next) => {
  let sql = 'SELECT * FROM andrew_books ORDER BY `finished` DESC';

  connection.query(sql, (err, results) => {
    if (err) throw err;

    console.log('Data received from database');
    res.send(JSON.stringify(results));
  });
}

// GET one book given id
exports.getOne = (req, res, next) => {
  let sql = `SELECT * FROM andrew_books WHERE id = ?`;
  let id = req.params.id;
  console.log(`Fetching data for book id ${id}...`);

  connection.query(sql, [id], (err, result) => {
    if (err) throw err;

    console.log(`Data received`);
    let json = JSON.stringify(result);
    res.status(200).send(json);
  });
}

// POST new book entry in databas
exports.create = (req, res, next) => {
  const newBook = req.body;
  if (Object.keys(newBook).length == 0) {
    return res.status(400).send({
      message: "Book information cannot be empty"
    });
  }

  let sql = 'INSERT INTO andrew_books SET ?';
  connection.query(sql, [newBook],
    (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
  });
  res.status(200).send(newBook);
}

// UPDATE a book identified by id in request
exports.update = (req, res, next) => {
  const newInfo = req.body;
  if (Object.keys(newInfo).length == 0) {
    return res.status(400).send({
      message: "Book information cannot be empty"
    });
  }

  connection.query(`UPDATE andrew_books SET ? WHERE id = ?`, [newInfo, newInfo.id],
    (err, res) => {
      if (err) throw err;
      console.log('Rows affected: ', res.affectedRows);
    }
  );
  res.status(200).send(newInfo);
}

// DELETE a book (given book id)
exports.delete = (req, res, next) => {
  let sql = `DELETE FROM andrew_books WHERE id = ?`;
  let id = req.params.id;

  connection.query(sql, [id],
    (err, res) => {
      if (err) throw error;

      console.log(`Deleted ${res.affectedRows} row(s)`);
    }
  );
  res.status(200).end();
}

// TESTS
// GET (all): curl http://localhost:5000/books
// GET (one): curl http://localhost:5000/books/3
// POST: curl -d "title=test" http://localhost:5000/books/
// UPDATE: curl -X PUT -d 'id=9&title=Updated!' http://localhost:5000/books/7
// DELETE: curl -X DELETE http://localhost:5000/books/7

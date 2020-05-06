// CRUD functions for routes in app/routes/book.routes.js
'use strict'
const connection = require('../../server.js');

// POST new book entry in databas
exports.create = (req, res) => {
  const newBook = req.body;
  if (Object.keys(newBook).length == 0) {
    return res.status(400).send({
      message: "Book information cannot be empty"
    })
  }

  // Make query to insert new book into table
  let query = 'INSERT INTO books SET ?';
  connection.query(query, [newBook],
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log('Last insert ID: ', res.insertId);
    }
  );
}

// GET all books: sent as array of JSON objects
exports.getAll = (req, res) => {
  let query = 'SELECT * FROM `books` ORDER BY `finished` DESC';

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    };

    console.log('Data received from database');
    res.send(JSON.stringify(results));
    results.forEach( (row) => {
      console.log(`${row.title} by ${row.authorFirstName} ${row.authorLastName}`);
    });
  });
}

// GET one book given id
exports.getOne = (req, res) => {
  let query = `SELECT * FROM books WHERE id = ?`;
  let id = req.params.id;
  console.log(`Fetching data for book id ${id}...`);

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Data received`);
    let json = JSON.stringify(result);
    res.status(200).send(json);
  });
}

// UPDATE a book identified by id in request
exports.update = (req, res) => {
  const newInfo = req.body;
  if (Object.keys(newInfo).length == 0) {
    return res.status(400).send({
      message: "Book information cannot be empty"
    });
  }

  connection.query(`UPDATE books SET ? WHERE id = ?`, [newInfo, newInfo.id],
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Rows affected: ', res.affectedRows);
    }
  );
}

// DELETE a book (given book id)
exports.delete = (req, res) => {
  let query = `DELETE FROM books WHERE id = ?`;
  let id = req.params.id;

  connection.query(query, [id],
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      };

      console.log(`Deleted ${res.affectedRows} row(s)`);
    }
  );
}

// TESTS
// GET (all): curl http://localhost:5000/books
// GET (one): curl http://localhost:5000/books/3
// POST: curl -d "&title=This%20is%20a%20Title&authorFirstName=Andrew&authorLastName=van%20Weerden&finished=2020-02-02&language=english&type=fiction&blurb=testing%20testing" http://localhost:5000/books/
// UPDATE: curl -X PUT -d 'id=7&title=Updated!' http://localhost:5000/books/7
// DELETE: curl -X DELETE -d http://localhost:5000/books/7

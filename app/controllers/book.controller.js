// CRUD functions for routes in app/routes/book.routes.js
'use strict'
const connection = require('../../server.js');

// Create new book entry in databas
exports.create = (req, res) => {
  // Create new note from encoded URL
  const newBook = req.body;
  console.log(newBook);

  // Make MySQL query to insert new book into table
  let query = 'INSERT INTO books SET ?';
  connection.query(query, newBook,
    (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    }
  );
}

// Retrieve and return all books from the database
exports.getAll = (req, res) => {
  let query = 'SELECT * FROM `books` ORDER BY `finished` DESC';

  // Execute query
  connection.query(query, (err, results) => {
    if(err) throw err;

    console.log('Data received from database');
    res.send(JSON.stringify(results));
    results.forEach( (row) => {
      console.log(`${row.title} by ${row.authorFirstName} ${row.authorLastName}`);
    });
  });
}

// Retrieve ONE book given id
exports.getOne = (req, res) => {
  let query = `SELECT * FROM books WHERE id = ?`;
  let id = req.params.id;
  console.log(`Fetching data for book id ${id}`);

  // Execute query
  connection.query(query, id, (err, result) => {
    if(err) throw err;

    console.log(`Received data for book id ${id}: `);
    let json = JSON.stringify(result);
    res.send(json);
    
    console.log(JSON.parse(json));
  });
}

// UPDATE a book identified by id
exports.update = (req, res) => {
  const update = req.body;

  connection.query(`UPDATE books SET ? WHERE id= ?`, [update, update.id],
    (err, res) => {
      if (err) throw err;
      console.log('Rows affected: ', res.affectedRows);
    }
  );
}

// DELETE a book (given book id)
exports.delete = (req, res) => {
  const deleteId = req.body.id;

  connection.query('DELETE FROM books WHERE id = ?', [deleteId],
    (err, res) => {
      if (err) throw err;

      console.log(`Deleted ${res.affectedRows} row(s)`);
    }
  );
}

// TESTS
// GET: curl http://localhost:5000/
  // POST: curl --data "&title=This%20is%20a%20Title&authorFirstName=Andrew&authorLastName=van%20Weerden&finished=2020-02-02&language=english&type=fiction&blurb=testing%20testing" http://localhost:5000/books/
// UPDATE: curl -X PUT -d 'id=7&title=Updated!' http://localhost:5000
// DELETE: curl -X DELETE -d 'id=7' http://localhost:5000

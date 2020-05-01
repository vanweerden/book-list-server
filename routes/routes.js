// CREATE, UPDATE, and DELETE methods
'use strict'
const connection = require('../app.js');

// TESTS
// GET: curl http://localhost:5000/
// POST: curl --data "&title=This%20is%20a%20Title&authorFirstName=Andrew&authorLastName=van%20Weerden&finished=2020-02-02&language=english&type=fiction&blurb=testing%20testing" http://localhost:5000/
// UPDATE: curl -X PUT -d 'id=7&title=Updated!' http://localhost:5000

module.exports = {
  // CREATE new book entry
  createEntry: (req, res) => {
    const newBook = req.body;

    connection.query('INSERT INTO books SET ?', newBook,
      (err, res) => {
        if (err) throw err;
        console.log('Last insert ID: ', res.insertId);
      }
    );
  },
  // UPDATE a book
  updateEntry: (req, res) => {
    const update = req.body;

    connection.query(`UPDATE books SET ? WHERE id= ?`, [update, update.id],
      (err, res) => {
        if (err) throw err;
        console.log('Rows affected: ', res.affectedRows);
      }
    );
  }


  // DELETE a book (given book id)

}

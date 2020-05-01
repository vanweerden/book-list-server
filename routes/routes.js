// Other routes
'use strict'
const connection = require('../app.js');

// POST route: Create new book entry
module.exports = {
  createEntry: (req, res) => {
    const newBook = req.body;

    connection.query('INSERT INTO books SET ?', newBook,
      (err, res) => {
        if (err) throw err;
        console.log('Last insert ID: ', res.insertId);
      }
    )
  }
}

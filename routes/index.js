// READ route: lists books
'use strict'
const connection = require('../app.js');

module.exports = {
  // Read and list books from database
  getBooks: (req, res) => {
    let query = 'SELECT * FROM `books` ORDER BY `finished` DESC';

    // Execute query
    connection.query(query, (err, results) => {
      if(err) throw err;

      console.log('Data received from database');
      results.forEach( (row) => {
        console.log(`${row.title} by ${row.authorFirstName} ${row.authorLastName}`);
      });
    });
  }
};

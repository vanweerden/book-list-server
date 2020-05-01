'use strict'
const express = require('express');
const app = express();

// Will help with POST parsing
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// PORT ENVIRONMENT VARIABLE
const port = 5000;

// Connect to database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'subAiku2.',
  database: 'sitepoint'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connecting as: ' + connection.threadId);
});

module.exports = connection;

// Import routes
const { getBooks } = require('./routes/index');
const { createEntry } = require('./routes/routes');

// test POST route
// curl --data "&title=This%20is%20a%20Title&authorFirstName=Andrew&authorLastName=van%20Weerden&finished=2020-02-02&language=english&type=fiction&blurb=testing%20testing" http://localhost:5000/


// Read and list books from database
app.get('/', getBooks);
app.post('/', createEntry);
// TEST
// curl --data "title=New%20Book&authorFirstName=Someone&authorLastName=New&finished=2020-02-02&type=fiction&blurb=it%20worked" http://locahost:5000/books

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// TODO: How to use this
// connection.end((err) => {
//   if (err) console.throw(error);
// });

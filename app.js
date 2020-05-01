'use strict'

const express = require('express');
const app = express();

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
const { getHomePage } = require('./routes/index');

// Read and list books from database
app.get('/', getHomePage);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// TODO: How to use this
// connection.end((err) => {
//   if (err) console.throw(error);
// });

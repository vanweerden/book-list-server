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

// Export so route modules can use
module.exports = connection;

// Import routes
const { getBooks } = require('./routes/index');
const { createEntry } = require('./routes/routes');
const { updateEntry } = require('./routes/routes');
const { deleteEntry } = require('./routes/routes');

// Route handlers
app.get('/', getBooks);
app.post('/', createEntry);
app.put('/', updateEntry);
app.delete('/', deleteEntry);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// TODO: How to use this
// connection.end((err) => {
//   if (err) console.throw(error);
// });

'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// PORT ENVIRONMENT VARIABLE
const process.env.PORT || port = 5000;

// TODO: hide this info before deployment
// Connect to database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'subAiku2.',
  database: 'book-list'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as: ' + connection.threadId);
});

// Export so route modules can use
module.exports = connection;

// Initial GET request
app.get('/', (req, res) => {
  res.json({"message": "Welome to Book List!"});
});

// Import Books routes
require('./app/routes/book.routes.js')(app);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// connection.end((err) => {
//   if (err) console.throw(error);
// });

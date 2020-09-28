'use strict'
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
require('dotenv').config();

const app = express();

// Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

const port = config.app.port;
const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.log('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as: ' + connection.threadId);
});

// Keep connection open to avoid ECONNRESET
const maintainConnection = () => {
  connection.query('SELECT 1', (err, res) => {
  if (err) {
    throw err;
  }
});
}
const intervalID = setInterval(maintainConnection, 6000);

module.exports = connection;

app.get('/', (req, res) => {
  res.json({"message": "Welome to Book List!"});
});

// Import Books routes
require('./app/routes/book.routes.js')(app);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

process.on('SIGINT', function() {
  console.log("\nGracefully shutting down from SIGINT (CTRL-C)");
  clearInterval(intervalID);
  process.exit();
})

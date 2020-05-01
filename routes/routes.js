// Create, Update, and Delete routes

'use strict'
const connection = require('../app.js');

module.exports = {
  // Create new book entry
  createEntry: (req, res) => {
    const newBook = {
      title: req.title,
      authorFirstName: req.authorFirstName,
      authorLastName: req.authorLastName,
      finished: req.finished,
      language: req.language,
      type: req.type,
      blurb: req.blurb
    };

    connection.query({
      sql: 'INSERT INTO `books` VALUES (?)',
      values: Object.keys(newBook)
    } function (err, res, fields)
  );


  }
};

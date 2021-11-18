'use strict';

// [START app]
const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();

// [START enable_parser]
// This middleware is available in Express v4.16.0 onwards
app.use(express.urlencoded({extended: true}));
// [END enable_parser]

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// [START add_display_form]
app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/form.html'));
});
// [END add_display_form]

// [START add_post_handler]
app.post('/submit', (req, res) => {

  var msg = {
              name_str: req.body.name,
              message: req.body.message,
            };

  console.log(msg);

  var msg_str = JSON.stringify(msg);
  var insert_query_str = 'insert into dbtest values ($1)';

  try {
      // gera uma exceção
      db.query(insert_query_str, msg_str);
      console.log('Sucesso da insercao!');
  }
  catch (e) {
      console.log(e.message);
      console.log('Erro de consulta da insercao!');
  }

  var table_request_str = 'select * from dbtest';

  // promise
  db.query(table_request_str)
    .then(res => {
      console.log('Sucesso da consulta 2!');
      console.log(res.rows[0])
    })
    .catch(e => console.error(e.stack))

  res.send('Thanks for your message!');
});
// [END add_post_handler]

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}...');
});
// [END app]

module.exports = app;
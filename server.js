'use strict';

// [START app]
const express = require('express');
const path = require('path');
const db = require('./db.js');
const query_builder = require('./utils.js').query_builder;

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
app.post('/submit', async (req, res) => {
    try {
      var msg = {
                  name_str: req.body.name,
                  message: req.body.message,
                };

      var insert_str = 'insert into user_messages values ($1)';
      var msg_str = JSON.stringify(msg);

      result = await query_builder(insert_str, [msg_str], 'Sucessful insertion');
      var request_str = 'select * from user_messages';
      await query_builder(request_str, [], 'Sucessful request!');

      res.send('Sucessful!');
    }
    catch(e) {
      console.log(e.stack);
    }
});
// [END add_post_handler]

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// [END app]
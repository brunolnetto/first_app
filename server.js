'use strict';

// [START app]
const Router = require('express-promise-router');

const app_settings = require('./db.js')
const db = app_settings.db;

async function query_builder(request_str, params_list, log_str){
  return db.query(request_str)
         .then(res => {
          console.log(log_str);
         })
         .catch(e => console.error(e.stack))
};

const app = app_settings.app;

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
    try {
      var msg = {
                  name_str: req.body.name,
                  message: req.body.message,
                };

      var msg_str = JSON.stringify(msg);
      var request_str = 'select * from user_messages';
      result = await query_builder(insert_query_str, [msg_str], 'Sucessful insertion');

      var insert_str = 'insert into user_messages values ($1)';
      await query_builder(table_request_str, [], 'Sucessful request!');

      res.send('Sucessful!');
    }
    catch(e) {
      console.log(e.stack);
    }
});
// [END add_post_handler]

// [END app]
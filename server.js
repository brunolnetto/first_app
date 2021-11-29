'use strict';

// [START app]
const express = require('express');
const path = require('path');
const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const query_builder = require('./utils.js').query_builder;

const app = express();
const credentials = db.credentials;

// [START enable_parser]
// This middleware is available in Express v4.16.0 onwards
app.use(express.json({extended: true}));
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
    var msg = {
                name_str: String(req.body.name),
                message: String(req.body.message),
              };

    try {
        console.log(msg);

        var query_raw = 'SELECT * FROM user_messages;';
        var params_list = [];
        var query_msg = 'Sucessful select.';
        
        result = await query_builder(query_raw, params_list, query_msg);
        
        console.log(result);

        /*
            var insert_str = 'insert into user_messages (id, name, message) values ($1, $2, $3)';
            var params_list = [uuidv4(), msg.name_str, msg.message];
            console.log(params_list);
            result = await query_builder(insert_str, params_list, 'Sucessful insertion');

            var request_str = 'select * from user_messages';
            result = await query_builder(request_str, [], 'Sucessful request!');
            console.log(result);
            res.send(result);
        */
    }
    catch(e) {
      console.log(e.stack);
    }

    res.send(msg);
});
// [END add_post_handler]

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// [END app]

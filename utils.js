'use strict';

const client = require('./db.js').client;

async function query_builder(request_str, params_list, log_str){
  console.log('oi');
  return client.query(request_str, params_list)
         .then(res => {console.log(log_str);})
         .catch(e => console.error(e.stack));
};

module.exports = {
        				  query_builder: (req_str, params_list, log_str) => 
                                query_builder(req_str, params_list, log_str),
				         };

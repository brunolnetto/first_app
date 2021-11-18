'use strict';

// [START app]
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

var postgres_credentials =  {
	'user': process.env.brunolnetto,
	'host': process.env.POSTGRES_HOST,
	'database': process.env.POSTGRES_DB,
	'password': process.env.POSTGRES_KEY,
	'port': 5432
}

const client = new pg.Client(postgres_credentials); 

module.exports = client;
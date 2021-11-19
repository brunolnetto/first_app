'use strict';

// [START app]
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const postgres_credentials =  {
	'user': process.env.POSTGRES_USER,
	'host': process.env.POSTGRES_HOST,
	'database': process.env.POSTGRES_DB,
	'password': process.env.POSTGRES_KEY,
	'port': process.env.POSTGRES_PORT
}

const client = new pg.Client(postgres_credentials); 

module.exports = client;
module.exports = postgres_credentials;
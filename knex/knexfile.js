// Update with your config settings.

'use strict';

const dotenv = require('dotenv')

dotenv.config({path: '../.env'});

const postgres_credentials =  {
  'user': process.env.POSTGRES_USER,
  'host': process.env.POSTGRES_HOST,
  'database': process.env.POSTGRES_DB,
  'password': process.env.POSTGRES_KEY,
  'port': process.env.POSTGRES_PORT
}

const dev_db_config = {
                        client: 'postgresql',
                          connection: postgres_credentials,
                          pool: {
                            min: 2,
                            max: 10
                          },
                          searchPath: ['knex', 'public'],
                      };

var knex_config_envs = {
                        development: dev_db_config,
                       };

module.exports = knex_config_envs;

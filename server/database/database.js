// Config DOTENV
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// DB configs
const configs = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
}

// Create pg client & pool
const { Client, Pool } = require('pg');
const client = new Client(configs);
const pool = new Pool(configs); // you may want to add more config for pool

module.exports = { client, pool };

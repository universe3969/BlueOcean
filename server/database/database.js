const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASS;
const port = process.env.DB_PORT;

const client = new Client({
  user,
  host,
  database,
  password,
  port,
});

module.exports = client;
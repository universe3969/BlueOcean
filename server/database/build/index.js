const { client } = require('../database.js');
const schema = require('./schema.js');

// Create/re-create all required SQL tables
// Schema here is same with tables, don't overthink
async function buildTables() {
  await client.connect();

  // Create enum data type
  await client.query('DROP TYPE IF EXISTS friendships_status CASCADE');
  await client.query(schema.friendships_status);

  // Create all tables
  for (let schemaName in schema) {
    // Skip the enum type
    if (schemaName === 'friendships_status') continue;

    // Make sure each time you end up with the new schema
    await client.query(`DROP TABLE IF EXISTS ${schemaName} CASCADE`);
    await client.query(schema[schemaName]);
  }

  await client.end();
}

async function test() {
  await client.connect();

  const res = await client.query("SELECT id FROM books WHERE title = 'The Hunger Games'");
  console.log(res);

  await client.end();
}


buildTables()
  .then(() => console.log('All tables are created or re-created...'))
  .catch(console.log);

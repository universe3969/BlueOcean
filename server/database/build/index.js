const { client } = require('../database.js');
const schema = require('./schema.js');

// Create/re-create all required SQL tables
// Schema here is same with tables, don't overthink
async function buildTables() {
  await client.connect();

  // Create all tables
  for (let schemaName in schema) {
    // Differentiate between type and table
    const isType = ['friendships_status', 'posts_type'].includes(schemaName);
    
    // Reset type or table, will delete all existing data
    await client.query(`DROP ${isType ? 'TYPE' : 'TABLE'} IF EXISTS ${schemaName} CASCADE`);
    await client.query(schema[schemaName]);
  }

  await client.end();
}

buildTables()
  .then(() => console.log('All tables are created or re-created...'))
  .catch(console.log);

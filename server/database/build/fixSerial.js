const { pool } = require('../../database/database');

async function setMax() {
  try {
    await pool.query('SELECT setval(\'posts_id_seq\', (SELECT MAX(id) FROM posts));');
    console.log('max set');
  }
  catch (e) {
    console.log(e);
  }
}

// setMax();

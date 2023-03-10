const { pool } = require('../database/database');

async function CreatePostController(req, res) {
  console.log('create post route hit');
  const { body, user_id, book_id, type } = req.body;
  try {
    await pool.query('INSERT INTO posts(body, user_id, book_id, type) VALUES($1, $2, $3, $4)', [body, user_id, book_id, type]);
    console.log('post inserted!');
    res.send('post inserted');
  }
  catch (e) {
    console.log(e);
  }
}

module.exports = CreatePostController;
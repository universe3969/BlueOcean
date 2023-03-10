const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const pool = require("../database/database").pool


router.get('/info/', async (req, res) => {
  let id = req.query.id
  pool.query('SELECT username, id, avator, bio FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json(results.rows[0]);
  });
});

router.get('/genre', async (req, res) => {
try {
  let id = req.query.id
  const query = {
    text: 'SELECT genre AS value, genre AS label FROM genres WHERE id IN (SELECT genre_id FROM users_genres WHERE user_id = $1)',
    values: [id],
  };

  const result = await pool.query(query);
  const genres = result.rows;
  res.json(genres)}
  catch(err) {
    res.json(err)
  }
});

router.post('/genre', async (req, res) => {
try {
  const values = req.body.selectedOptions.map(option => option.value);
  const placeholders = values.map((label, index) => `$${index + 2}`).join(', ');
  values.unshift(req.query.id);
  const query1 = `
  WITH genre_ids AS (
    SELECT id
    FROM genres
    WHERE genre IN (${placeholders})
  )
  INSERT INTO users_genres (user_id, genre_id)
  SELECT $1, id
  FROM genre_ids
  ON CONFLICT (user_id, genre_id) DO NOTHING;
`;

 const query2 = `
 DELETE FROM users_genres
 WHERE genre_id NOT IN (
   SELECT id
   FROM genres
   WHERE genre IN (${placeholders})
 ) AND user_id = $1;`;
//  console.log(values)
const checkAndInsertQuery = {
  text: query1,
  values: values,
};

const deleteQuery = {
  text: query2,
  values: values,
};

pool.query(checkAndInsertQuery, (err, resp) => {
  if (err) {
    console.error('Error executing check and insert query', err.stack);
    return;
  }

  // console.log('Check and insert query result:', resp);

  pool.query(deleteQuery, (err, resp) => {
    if (err) {
      console.error('Error executing delete query', err.stack);
      return;
    }

    // console.log('Delete query result:', resp);
    res.json('cool')
  });
});
}
 catch(err) {
  res.json(err);
 }
});

router.post('/info/', async (req, res) => {
  const { username, avator, email, bio } = req.body.data;
  const text = `
  INSERT INTO users (username, avator, email, bio)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (email) DO UPDATE
  SET username = EXCLUDED.username,
  avator = EXCLUDED.avator,
  bio = EXCLUDED.bio;
  `;

  const values = [username, avator, email, JSON.stringify(bio)];

  pool.query(text, values)
  .then(() => {
    res.sendStatus(201)
  })
  .catch((err) => {
    res.json(err);
  });

});

router.get('/id', async (req, res) => {
  let email = req.query.id.toString()
  await pool.query(`
  INSERT INTO users (email)
  SELECT '${req.query.id}'
  WHERE NOT EXISTS (SELECT id FROM users WHERE email = '${req.query.id}')`
);
  await pool.query('SELECT id FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json(results.rows[0]);
  });
})



module.exports = router;
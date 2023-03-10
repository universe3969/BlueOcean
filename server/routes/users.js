const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const pool = require("../database/database").pool


router.get('/info/', async (req, res) => {
  let email = req.query.id
  pool.query('SELECT username, id, avator, bio FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json(results.rows[0]);
  });
});

router.get('/genre', async (req, res) => {
try {  const email = req.query.id;
  const query = {
    text: 'SELECT genre AS value, genre AS label FROM genres WHERE id IN (SELECT genre_id FROM users_genres WHERE user_id = (SELECT id FROM users WHERE email = $1))',
    values: [email],
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
  WITH user_id AS (
    SELECT id
    FROM users
    WHERE email = $1
  ), genre_ids AS (
    SELECT id
    FROM genres
    WHERE genre IN (${placeholders})
  )
  INSERT INTO users_genres (user_id, genre_id)
  SELECT (SELECT id FROM user_id), id
  FROM genre_ids;
`;
 const query2 = `
 DELETE FROM users_genres
 WHERE genre_id NOT IN (
   SELECT id
   FROM genres
   WHERE genre IN (${placeholders})
 ) AND user_id = (
   SELECT id
   FROM users
   WHERE email = $1
 );
`;


await pool.query(query1, values);
await pool.query(query2, values);
  res.json('cool')}
  catch(err) {
    res.json(err)
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
  const values = [username, avator, email, bio];

  pool.query(text, values)
  .then(() => {
    res.sendStatus(201)
  })
  .catch((err) => {
    res.json(err);
  });

});

router.get('/id', async (req, res) => {
  let email = req.query.id
  pool.query('SELECT id FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json(results.rows[0]);
  });
})



module.exports = router;
const express = require('express');
const router = express.Router();
const {pool} = require('../database/database.js')


router.get('/', async(req, res) => {

  try {
    console.log('querying');
    const result = await pool.query(
      `SELECT * FROM books LIMIT 1000`
    )
    .then((data) => {
      console.log('sending');
      res.status(201).send(data);
    })
    res.json(result);
  } catch (err) {
    console.log('there was an error acquring genres');
  }
})

router.get('/genre-options', async(req, res) => {

  try {
    console.log('querying options');
    const result = await pool.query(
      `SELECT * FROM genres`
    )
    .then((data) => {
      console.log('sending genres');
      res.status(201).send(data);
    });
    res.json(result);
  } catch (err) {
    console.log('there was an error acquring genres');
  }
})

router.post('/genres', async(req, res) => {
  try {  const labelsArray = req.body?.selectedOptions.map(option => option.label);
    const placeholders = labelsArray.map((label, index) => `$${index + 1}`).join(', ');
    const text = `
    SELECT b.*
    FROM books b
    INNER JOIN books_genres bg ON bg.book_id = b.id
    INNER JOIN genres g ON g.id = bg.genre_id
    WHERE g.genre IN (${placeholders})
  `
    const values = labelsArray;
    const response = await pool.query(text, values);
    // console.log(response.rows)
    res.json(response.rows);
  }
  catch(err) {
      console.log(err)
      res.json('not yet')
    }
  });






module.exports = router;
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

router.get('/book-genres', async(req, res) => {

  try {
    console.log('querying options');
    const result = await pool.query(
      `SELECT * FROM books_genres LIMIT 5000`
    )
    .then((data) => {
      console.log('sending genres and books table');
      res.status(201).send(data);
    });
    res.json(result);
  } catch (err) {
    console.log('there was an error acquring genres');
  }
})


module.exports = router;
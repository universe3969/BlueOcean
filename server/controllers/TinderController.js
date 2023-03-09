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
    console.log(req.params);
    console.log(req.query);

    // iterate thru the params construct a query string

    const result = await pool.query(
    //   `SELECT b.id, title, author, publish_date, page_count, description, cover_image, price, availability
    //   FROM books b
    // INNER JOIN books_genres bg ON bg.book_id = b.id
    // INNER JOIN genres g ON g.id = bg.genre_id
    // WHERE g.genre = 'Young Adult';`
    // `SELECT b.id, bg.genre_id
    // FROM books b
    // JOIN books_genres bg ON bg.book_id = bg.book_id
    // JOIN genres g ON bg.genre_id = bg.genre_id`

    `
    select books.id, books.cover_image, books.title, books.description, books.author, books_genres.book_id, books_genres.genre_id from books JOIN books_genres ON books.id = books_genres.book_id
    `
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
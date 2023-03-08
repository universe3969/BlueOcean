const express = require('express');
const router = express.Router();
const { queryAllBooks, queryBookById, queryBooksByTitle } = require('../models/books.js');

// -------------------------- Warning ------------------------
// No validation nor correct error handling!!!!!!

// Get all books, this will only return { bookId, title, author, cover_image }  
// Take queryStrings { sort=['date', 'latest'], ascending=false, pageCount=10, page=1 }
// Right now it has no validation, which is bad, but refactor later, push MVP
router.get('/', async(req, res) => {
  try {
    const result = await queryAllBooks(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Get book by ID
router.get('/id/:id', async(req, res) => {
  try {
    const result = await queryBookById(req.params.id);
    res.status(200).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Live search book by title
router.get('/title/:title', async(req, res) => {
  console.log(req.params.title);
  try {
    const result = await queryBooksByTitle(req.params.title);
    res.status(200).json(result); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Get book by User, implemented later
router.get('/user/:userId', async(req, res) => {
  res.sendStatus(501);
});

module.exports = router;

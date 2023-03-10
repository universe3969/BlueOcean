const express = require('express');
const router = express.Router();
const {pool} = require('../database/database.js');
const {getUserInfo, getUserPosts} = require('../models/profile.js');

router.get('/bio/:id', async(req, res) => {
  try {
    const data = await getUserInfo(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})

router.get('/posts/:id', async(req, res) => {
  try {
    const data = await getUserPosts(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;

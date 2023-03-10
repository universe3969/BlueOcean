const express = require('express')
const router = express.Router()
const {pool} = require('./database/database.js')

router.get('/api/friends/:id', async (req, res) => {
})

module.exports = router;

const express = require('express')
const router = express.Router()
const {pool} = require('./database/database.js')

router.get('/:userId/messages', async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (users.id)
         users.id,
         users.username,
         users.avator,
         messages.body AS lastMessage,
         messages.date AS lastMessageDate
       FROM users
       JOIN (
         SELECT DISTINCT ON (CASE WHEN from_id < to_id THEN from_id ELSE to_id END, CASE WHEN from_id < to_id THEN to_id ELSE from_id END)
           id,
           from_id,
           to_id,
           body,
           date
         FROM messages
         WHERE from_id = $1 OR to_id = $1
         ORDER BY CASE WHEN from_id < to_id THEN from_id ELSE to_id END, CASE WHEN from_id < to_id THEN to_id ELSE from_id END, date DESC
       ) AS messages ON users.id = CASE WHEN messages.from_id = $1 THEN messages.to_id ELSE messages.from_id END
       WHERE users.id != $1
       ORDER BY users.id`,
       [userId]
    );
    console.log("this is the ressult for this user", result)
    // Format results as an array of objects
    const formattedResults = result.rows.map(row => ({
      id: row.id,
      username: row.username,
      avator: row.avator,
      lastMessage: row.lastmessage,
      lastMessageDate: row.lastmessagedate
    }));

    formattedResults.sort((a, b) => {
      return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
    })

    // Send the formatted results as a JSON response
    res.json(formattedResults);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});



router.post('/messages', async (req, res) => {
  const { from_id, to_id, body } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO messages (from_id, to_id, body)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [from_id, to_id, body]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;

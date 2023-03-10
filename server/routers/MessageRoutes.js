const express = require('express')
const router = express.Router()
const {pool} = require('../database/database.js')

router.get('/:userId/friends', async (req, res) => {
  // console.log("try to get friends list from friends ", req.params)
  const {userId} = req.params;

  const friends = await pool.query(
    `SELECT u.id, u.username, u.avator
    FROM friendships f
    JOIN users u ON f.friend_id = u.id
    WHERE f.user_id = $1`,
    [userId]
  );

  res.json(friends.rows);
})

router.get('/:userId/messages', async (req, res) => {
  // console.log("get messages router get hit!")
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

router.get('/:userId/:friendId', async (req, res) => {
  console.log("get usr/friend id route get hit ", req.params)
  const { userId, friendId } = req.params;
  const userAvator = await pool.query(
    `SELECT id, username, avator
    FROM users
    WHERE id = $1
    `,[userId]
  )
  const friendAvator = await pool.query(
    `SELECT id, username, avator
    FROM users
    WHERE id = $1
    `,[friendId]
  )
  // console.log("here is the response for userAvator ",userAvator.rows, "followed by friendAvator :",friendAvator.rows)

  const friend_avator = friendAvator.rows[0].avator
  const friend_username = friendAvator.rows[0].username
  const user_avator = userAvator.rows[0].avator

  const messageHistory = await pool.query(
    `SELECT m.body, m.from_id, m.to_id, m.date, u2.username as friend_username
     FROM messages m
     JOIN users u2 ON m.to_id = u2.id
     WHERE (m.from_id = $1 AND m.to_id = $2) OR (m.from_id = $2 AND m.to_id = $1)
     ORDER BY m.date ASC`,
    [userId, friendId]
  );
  const messagesWithUsers = messageHistory.rows.map(message => ({
    fromId: message.from_id,
    toId: message.to_id,
    body: message.body,
    friendAvator: friend_avator,
    friendUsername: friend_username,
    userAvator:user_avator,
    friendId:friendId
  }));
  // console.log("messages send back to front end: ", messagesWithUsers)
  res.json(messagesWithUsers);
});

router.post('/messages', async (req, res) => {
  // console.log("posing message router get hit? ", req.body)
  try {
    const { fromId, toId, body } = req.body;
    const result = await pool.query(
      'INSERT INTO messages (from_id, to_id, body) VALUES ($1, $2, $3) RETURNING *',
      [fromId, toId, body]
    );
    const message = result.rows[0];
    res.json(message);
  } catch (error) {
    // console.error('Failed to send message.', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

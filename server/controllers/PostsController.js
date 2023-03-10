const { pool } = require('../database/database');

async function PostsController(req, res) {
  const id = 1;
  try {
    friendships = await pool.query('SELECT * FROM friendships WHERE user_id = $1', [id]);
    // console.log(`friends are: ${JSON.stringify(friendships.rows)}`);
    const friendIds = [];
    for (const friend of friendships.rows) {
      friendIds.push(friend.friend_id);
    }
    const allFriendPosts = [];
    for (const friendId of friendIds) {
      const friendPosts = await pool.query('SELECT * FROM posts WHERE user_id = $1', [friendId]);
      for (const post of friendPosts.rows) {
        allFriendPosts.push(post);
      }
    }
    console.log(allFriendPosts);
    for (let i = 0; i < allFriendPosts.length; i++) {
      const bookUrl = await pool.query('SELECT cover_image FROM books WHERE id = $1', [allFriendPosts[i].book_id]);
      allFriendPosts[i].cover_image = bookUrl.rows[0].cover_image;
    }

    for (let i = 0; i < allFriendPosts.length; i++) {
      const friendProfilePicture = await pool.query('SELECT avator FROM users WHERE id = $1', [allFriendPosts[i].user_id]);
      allFriendPosts[i].avator = friendProfilePicture.rows[0].avator;
    }

    for (let i = 0; i < allFriendPosts.length; i++) {
      const username = await pool.query('SELECT username FROM users WHERE id = $1', [allFriendPosts[i].user_id]);
      allFriendPosts[i].username = username.rows[0].username;
    }
    res.send(allFriendPosts);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = PostsController;
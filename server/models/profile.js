const {pool} = require('../database/database.js');

async function getUserInfo(userId) {
  const query = `
    SELECT books.cover_image
    FROM users_books
    JOIN books ON users_books.book_id = books.id
    WHERE users_books.user_id = ${userId};

    SELECT username, avator, bio FROM users WHERE id = ${userId};

    SELECT genres.genre
    FROM users_genres
    JOIN genres ON users_genres.genre_id = genres.id
    WHERE users_genres.user_id = ${userId};
  `;
  try {
    const result = await pool.query(query);
    const userBooks = result[0].rows;
    const user = result[1].rows[0];
    const userGenres = result[2].rows;
    return { userBooks, user, userGenres };
  } catch (err) {
    console.error(err);
  }
}
async function getUserPosts(userId) {
  const query = `
    SELECT * FROM posts WHERE user_id = ${userId} AND type IN ('post', 'review', 'note') ;
  `;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}



module.exports = {getUserInfo, getUserPosts};
const { pool } = require('../database/database.js');

// There could be many query way
// 1. Hotest, most reviewed books, now only orderd by id, refactor later
// 2. Latest, most recent books
// 3. Saved, user saved books

async function queryAllBooks({ sort='hottest', pageCount=10, page=1 }) {
  const queryString = `
    SELECT id, title, author, cover_image
    FROM books
    ORDER BY ${sort === 'date' ? 'publish_date' : 'id'} 
    ${sort === 'date' ? 'DESC' : 'ASC'}
    LIMIT $1
    OFFSET $2
  `;

  const queryParams = [pageCount, (page - 1) * pageCount];
  
  const res = await pool.query(queryString, queryParams);
  return res.rows;
}

// Return all information including genres and genre_id
async function queryBookById(bookId) {
  let res = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);

  if (!res.rows.length) return null;

  const bookInfo = res.rows[0];
  bookInfo.genres = []; // { genre, genre_id }

  res = await pool.query('SELECT genre_id FROM books_genres WHERE book_id = $1', [bookId]);
  for (let {genre_id} of res.rows) {
    const res2 = await pool.query('SELECT genre FROM genres WHERE id = $1', [genre_id]);
    bookInfo.genres.push({ genre_id, genre: res2.rows[0].genre });
  }

  return bookInfo;
}

// Order by reverse insertion order
async function queryBooksByUser(userId) {
  const queryString = `
    SELECT id, title, author, cover_image
    FROM books 
    WHERE id IN ( 
      SELECT book_id 
      FROM users_books
      WHERE user_id = $1
    )
    ORDER BY id DESC 
  `;

  const res = await pool.query(queryString, [userId]);
  return res.rows;
}

// Live search functinality, search using regex on title
// should only return { bookId, author, title, [*cover_iamge] }
// Also should only show first 10 results, for faster data transmission
async function queryBooksByTitle(bookName) {
  const queryString = `
    SELECT id, title, author, cover_image
    FROM books
    WHERE title ILIKE $1
    LIMIT 10 
  `;

  const res = await pool.query(queryString, [bookName + '%']);
  return res.rows;
}

// Only support three functions for now
module.exports = { queryBooksByUser, queryAllBooks, queryBookById, queryBooksByTitle };

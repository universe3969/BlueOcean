const { pool } = require('../database/database.js');

// There could be many query way
// 1. Hotest, most reviewed books
// 2. Latest, most recent books
// 3. Saved, user saved books

async function queryAllBooks({ sort='date', ascending=false, pageCount=10, page=1 }) {
  // Now this does not handle hotest, but only latest, refactor later
  const queryString = `
    SELECT id, title, author, cover_image
    FROM books
    ORDER BY ${sort === 'date' ? 'publish_date' : 'publish_date'} 
    ${ascending ? 'ASC' : 'DESC'}
    LIMIT $1
    OFFSET $2
  `;

  const queryParams = [pageCount, (page - 1) * pageCount];
  
  const res = await pool.query(queryString, queryParams);
  return res.rows;
}

async function queryBookById(bookId) {
  const res = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
  return res.rows;
}

async function queryBooksByUser(userId) {
  
}

// Live search functinality, search using regex on title
// should only return { bookId, author, title, [*cover_iamge] }
async function queryBooksByTitle(bookName) {
  const queryString = `
    SELECT id, title, author, cover_image
    FROM books
    WHERE title ILIKE $1 
  `;

  const res = await pool.query(queryString, [bookName + '%']);
  return res.rows;
}

// Only support three functions for now
module.exports = { queryAllBooks, queryBookById, queryBooksByTitle };

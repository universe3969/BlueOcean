const { client } = require('../database.js');
const books = require('./data/books.json');
const genres = require('./data/genres.json');
const posts = require('./data/posts.json');
const users = require('./data/users.json');

// First inser into genres, then books, finally books_genres
async function seed() {
  await client.connect();
  const start = new Date();

  // Insert into genres
  // Keep track of id for genres table, used later
  const genreMap = new Map;
  for (let i = 0; i < genres.length; i++) {
    genreMap.set(genres[i], i+1);

    await client.query({
      text: 'INSERT INTO genres(genre) VALUES ($1)',
      values: [genres[i]]
    });
  }

  // Insert into books
  for (let book of books) {
    // Randomize for price and availability
    const price = (Math.random()*299 + 1).toFixed(2); // $1 - $300
    const availability = Boolean(Math.random() >= 0.5); // 50 50 chance
    const { title, author, date, summary, cover, pageCount } = book;

    await client.query({
      text: `INSERT INTO books(
        title, author, publish_date, page_count,
        description, cover_image, price, availability
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      values: [
        title, author, date, pageCount,
        summary || null, cover, price, availability
      ]
    });
  }

  // Insert into books_genres
  for (let i = 0; i < books.length; i++) {
    for (let genre of books[i].genre) {
      const genreId = genreMap.get(genre);
      const bookId = i + 1;

      await client.query({
        text: 'INSERT INTO books_genres(genre_id, book_id) VALUES($1, $2)',
        values: [genreId, bookId]
      });
    }
  }

  // Insert into users, for testing posts data
  for (let i = 0; i < users.length; i++) {
    const { username, password, email, bio } = users[i];
    await client.query({
      text: 'INSERT INTO users(username, password, email, bio) VALUES($1, $2, $3, $4)',
      values: [username, password, email, bio]
    });
  }

  // Insert into posts
  for (let i = 0; i < posts.length; i++) {
    const { body, user_id, book_id, type } = posts[i];
    await client.query({
      text: 'INSERT INTO posts(body, user_id, book_id, type) VALUES($1, $2, $3, $4)',
      values: [body, user_id, book_id, type]
    });
  }

  const end = new Date();
  await client.end();

  return ((end - start)/1000).toFixed();
}

seed()
  .then(timeUsed => console.log(`Seeding finished in ${timeUsed} seconds...`))
  .catch(console.log);

const books = `CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  author VARCHAR(255) NOT NULL,
  publish_date DATE,
  page_count SMALLINT,
  description TEXT,
  cover_image VARCHAR(255),
  price DECIMAL(10, 2) CHECK (price > 0),
  availability BOOLEAN DEFAULT FALSE
)`;

const genres = `CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre VARCHAR(255) UNIQUE NOT NULL
)`;

const books_genres = `CREATE TABLE books_genres (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL REFERENCES books,
  genre_id INT NOT NULL REFERENCES genres
)`;

// avator is a link to the photo, if not provided we should have a default avator
const users = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avator VARCHAR(255),
  bio VARCHAR(255)
)`;

const users_books = `CREATE TABLE users_books (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users,
  book_id INT NOT NULL REFERENCES books
)`;

const users_genres = `CREATE TABLE users_genres (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users,
  genre_id INT NOT NULL REFERENCES genres
)`;

const friendships_status = `CREATE TYPE friendships_status
  AS ENUM('receive_pending', 'send_pending', 'accecpted', 'declined', 'block')
`;

const friendships = `CREATE TABLE friendships (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users,
  friend_id INT NOT NULL REFERENCES users,
  status friendships_status
)`;

// All reviews, notes, and posts live in posts table
const posts_type = `CREATE TYPE posts_type
  AS ENUM('review', 'post', 'note')
`;

// Right now we don't support photos for posts
// const posts = `CREATE TABLE posts (
//   id SERIAL PRIMARY KEY,
//   body TEXT NOT NULL,
//   user_id INT NOT NULL REFERENCES users,
//   book_id INT REFERENCES books,
//   last_updated DATE DEFAULT NOW(),
//   last_created DATE DEFAULT NOW(),
//   type posts_type NOT NULL
// )`;

// const messages = `CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   body TEXT NOT NULL,
//   from_id INT NOT NULL REFERENCES users,
//   to_id INT NOT NULL REFERENCES users,
//   date DATE DEFAULT NOW()
// )`;

module.exports = {
  books,
  genres,
  books_genres,
  users,
  users_genres,
  users_books,
  friendships_status,
  friendships,
  posts_type,
  posts,
  messages
};

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

const users = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio JSON
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

const posts = `CREATE TABLE posts (
  
)`;



module.exports = {
  books,
  genres,
  books_genres,
  users,
  users_genres,
  friendships_status,
  friendships,
};

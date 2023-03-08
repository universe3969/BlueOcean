import React, { useState, useEffect } from 'react';
import './Profile.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
export default function Profile () {
  const data = {
    name: 'bunny',
    profile_pic: 'https://partyanimals.com/static/avatars-12.png',
    age: 24,
    gender:'male',
    likedBooks: ['https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg', "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg","https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667708346i/43641.jpg", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1622355533i/4667024.jpg", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg"],
    interests: ['enjoy playing video games', 'enjoy doing exercise'],
    friend_status: 'pending'
  }
  const posts = [
    {
      content: 'Today is a good day',
      createdAt: '2022-02-02 19:12:21'
    },
    {
      content: 'I love reading Books',
      createdAt: '2013-03-03 3:03:33'
    },
    {
      content: 'Just finished Hunger Games',
      createdAt: '2011-1-1 11:11:11'
    },
    {

      content: 'Spent the day hiking and it was amazing!',
      createdAt: '2023-03-08 12:30:00'
    },
    {
      content: 'Finally finished my painting!',
      createdAt: '2023-03-06 16:45:00'
    },
    {
      content: 'I tried a new recipe and it turned out great!',
      createdAt: '2023-03-04 20:15:00'
    },
    {
      content: 'I watched a great movie last night',
      createdAt: '2023-03-03 22:00:00'
    },
    {
      content: 'I just got back from a trip to Hawaii!',
      createdAt: '2023-03-01 11:00:00'
    },
    {
      content: 'I started learning a new language today',
      createdAt: '2023-02-28 9:00:00'
    }
  ];

  const { name, profile_pic, age, gender, likedBooks, interests, friend_status } = data;

  return (
    <main className="profile-page-container">


      <div className="profile-post-container">
        {posts.map((post, index) => (
        <div className="profile-post" key={index}>
          <div>{post.user}</div>
          <p>{post.content}</p>
          <p>Created At: {post.createdAt}</p>
        </div>
        ))}
      </div>


      <div className="profile-bio-container">
        <div className="profile-page-username">{name}</div>
        <img src={profile_pic} alt="Profile" className="profile-page-avatar" />
        <div>Age: {age}</div>
        <div>Gender: {gender}</div>
        <div>
          <h3>Liked Books</h3>
          <div className="profile-page-books-container">
            {likedBooks.map((book, index) => (
              <img src={book} alt="Book" key={index} className="profile-page-books"/>
            ))}
          </div>
        </div>
        <div className="profile-page-interests-container">
          <div>Interests:</div>
          <div className=""></div>
            {interests.map((interest, index) => (
              <p key={index}>{interest}</p>
            ))}
        </div>
      </div>

    </main>
  );
}
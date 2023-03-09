import React from 'react';

import Post from './Post/Post.jsx'

import './Feed.scss';


const posts = [{
  id: 1,
  bookId: 1,
  userId: 'user1',
  body: 'this is a review about a book',
  isPublic: true,
  isReview: true,
},
{
  id: 2,
  bookId: null,
  userId: 'user43',
  body: 'this is a post',
  isPublic: true,
  isReview: false,
},
{
  id: 3,
  bookId: null,
  userId: 'user4343',
  body: 'this is a post',
  isPublic: true,
  isReview: false,
},
{
  id: 4,
  bookId: null,
  userId: 'user423',
  body: 'this is a post',
  isPublic: true,
  isReview: false,
},
{
  id: 5,
  bookId: null,
  userId: 'user43',
  body: 'this is a post',
  isPublic: true,
  isReview: false,
},
{
  id: 6,
  bookId: null,
  userId: 'user43',
  body: 'this is a post',
  isPublic: true,
  isReview: false,
  }];

// posts is a list of objects which each contain a bookId, userId, isReview, and isPublic
export default function Feed() {
  return (
    <div className="feed-container">
      {posts.map((post) => {
        return (<Post
          key={post.id}
          bookId={post.bookId}
          userId={post.userId}
          body={post.body}
          isPublic={post.isPublic}
          isReview={post.isReview}
        />);
      })}
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import Post from '../Feed/Post/Post.jsx';
import './Posts.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
export default function Posts({ posts }) {
  return (
    <main>
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
    </main>
  );
}
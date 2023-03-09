import React, { useState, useEffect } from 'react';
import Post from '../Feed/Post/Post.jsx';
// import postData from '../../../../server/database/seed/data/posts.json';
import './Posts.scss';

// Don't change this <main> wrapper, this tag is used in App.scss
export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <main>
       <div className="feed-container">
        {posts.map((post) => {
        return (<Post
          key={post.id}
          book_id={post.book_id}
          user_id={post.user_id}
          body={post.body}
          type={post.type}
        />);
      })}
    </div>
    </main>
  );
}
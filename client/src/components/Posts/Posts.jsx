import React, { useState, useEffect } from 'react';
import Post from '../Feed/Post/Post.jsx';
import MakePost from '../Feed/Post/MakePost.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
// import postData from '../../../../server/database/seed/data/posts.json';
import './Posts.scss';

// Don't change this <main> wrapper, this tag is used in App.scss
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const user = useAuth0().user;
  const id = user?.id;
  console.log(id);

  useEffect(() => {
    console.log('effect ran');
    async function callProtectedFriends() {
      const token = await getAccessTokenSilently();
      console.log('token received successfully');
      await axios.get("http://localhost:3002/posts", {
        headers: {
          authorization: `Bearer ${token}`
        },
        params: {
          // we can use params to make specific calls to userid via email
          user: id
        }
      })
        .then((data) => {
          // console.log(`data.data is: ${data.data}`);
          setPosts(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    callProtectedFriends();
  }, []);

  return (
    <main>
      <div className="feed-container">
        <MakePost />
        {posts.map((post) => {
        return (<Post
          key={post.id}
          book_id={post.book_id}
          avator={post.avator}
          cover_image={post.cover_image}
          user_id={post.user_id}
          body={post.body}
          type={post.type}
          username={post.username}
        />);
      })}
    </div>
    </main>
  );
}
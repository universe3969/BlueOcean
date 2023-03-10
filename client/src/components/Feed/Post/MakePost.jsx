import React, { useState } from 'react';
import axios from 'axios';
import './MakePost.scss';

function PostForm() {
  const [body, setBody] = useState('');
  const [book_id, setBookId] = useState('');
  const [type, setPostType] = useState('post');

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleBookIdChange = (e) => {
    setBookId(e.target.value);
  };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleSubmit = () => {
    const user_id = 10;
    axios.post('http://localhost:3000/createpost', {
      body,
      book_id,
      type,
      user_id
    })
    .then((response) => {
      console.log(response.data);
      // Reset the form after submitting
      setBody('');
      setBookId('');
      setPostType('post');
    })
    .catch((error) => {
      console.error(error);
    });

    console.log({
      body,
      book_id,
      type,
      user_id
    });
  };

  return (
    <div className="makePost">
      <label>
        <textarea className="post-body-form" value={body} onChange={handleBodyChange} placeholder="What's on your mind?" />
      </label>
      <label>
        <input type="text" value={book_id} onChange={handleBookIdChange} placeholder="What book is this about?" />
      </label>
      <label>
        <select value={type} onChange={handlePostTypeChange}>
          <option value="post">Post</option>
          <option value="review">Review</option>
        </select>
      </label>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
}

export default PostForm;
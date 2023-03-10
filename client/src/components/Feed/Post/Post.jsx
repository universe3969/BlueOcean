import React from 'react';

import './Post.scss'

// posts contain a bookid, a userid, a body, if it is public, and if it is a review
// if review is null, the post is a tweet
// if the bookId is null, it is not about a book
export default function Post({ book_id, user_id, body, type, cover_image, avator, username }) {

  return (
    <div className="post">
      <div className="profile-picture-section">
        <img className="profile-picture" src={avator}></img>
        <h3 className="userId">
          @{username}
        </h3>
      </div>
      <div className="post-blurb">

        {book_id && <img className="post-book-cover" src={cover_image}></img>}
        <p className="post-body">
          {body}
        </p>
      </div>
    </div>
  )
}
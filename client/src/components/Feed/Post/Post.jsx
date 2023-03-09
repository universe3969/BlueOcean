import React from 'react';

import './Post.scss'

// posts contain a bookid, a userid, a body, if it is public, and if it is a review
// if review is null, the post is a tweet
// if the bookId is null, it is not about a book
export default function Post({ bookId, userId, body, isPublic, isReview }) {

  return (
    <div className="post">
      <div className="profile-picture-section">
        <img className="profile-picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></img>
      </div>
      <div className="post-blurb">
        <h3>
          @{userId}
        </h3>
        {bookId && <img className="post-book-cover" src="https://www.seekpng.com/png/detail/777-7771369_open-book-clipart-book-cover.png"></img>}
        <p className="post-body">
          {body}
        </p>
      </div>
    </div>
  )
}
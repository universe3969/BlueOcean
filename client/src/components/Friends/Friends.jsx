import React, { useState, useEffect } from 'react';
import './Friends.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
export default function Friends() {

  const friendsList = [
    {
      id: 1,
      name: 'John',
      age: 30,
      gender: 'male',
      city: 'New York',
      interests: ['reading', 'hiking', 'traveling'],
      avatar: 'https://partyanimals.com/static/avatars-02.png',
    },
    {
      id: 2,
      name: 'Sarah',
      age: 25,
      gender: 'female',
      city: 'San Francisco',
      interests: ['yoga', 'music', 'painting'],
      avatar: 'https://partyanimals.com/static/avatars-03.png',
    },
    {
      id: 3,
      name: 'Alex',
      age: 28,
      gender: 'male',
      city: 'Seattle',
      interests: ['coding', 'cooking', 'biking'],
      avatar: 'https://partyanimals.com/static/avatars-04.png',
    },
  ];

  return (
    <main>
      <h1>My Friends</h1>
      <ul className="friends-list">
        {friendsList.map((friend) => (
          <li key={friend.id} className="friend-item">
            <img className="friends-page-avatar" src={friend.avatar} alt={friend.name} />
            <div className="friend-details">
              <h2>{friend.name}</h2>
              <p>{friend.age} years old</p>
              <p>{friend.gender}</p>
              <p>Interests: {friend.interests.join(', ')}</p>
              <button>Message</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
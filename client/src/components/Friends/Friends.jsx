import React, { useState, useEffect } from 'react';
import FriendRequests from './FriendRequests.jsx';
import FriendsList from './FriendsList.jsx';
import './Friends.scss';

// Don't change this <main> wrapper, this tag is used in App.scss
export default function Friends() {
  const user = {id: 2}

  return (
    <main>
      <h1>My Friends</h1>
      <FriendsList />
      <FriendRequests />
    </main>
  );
}
import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdRateReview as PostIcon, MdExplore as ExploreIcon } from 'react-icons/md';
import {
  FaUserFriends as FriendIcon,
  FaBook as BookIcon,
  FaHome as HomeIcon,
  FaUser as ProfileIcon,
  FaSms as MessageIcon
} from 'react-icons/fa';
import './Navbar.scss';

export default function Navbar() {

  return (
    <nav>
      <ul>
        <li><Link to='/home'><HomeIcon />Home</Link></li>
        <li><Link to='/books'><BookIcon />My Books</Link></li>
        <li><Link to='/friends'><FriendIcon />My Friends</Link></li>
        <li><Link to='/posts'><PostIcon />My Posts</Link></li>
        <li><Link to='/messages'><MessageIcon />My Message</Link></li>
        <li><Link to='/profile'><ProfileIcon />My Profile</Link></li>
        <li><Link to='/explore'><ExploreIcon />Explore</Link></li>
      </ul>
    </nav>
  );
}

// const [activeTab, setActiveTab] = useState('book');

// const handleTabClick = useCallback((tab) => {
//   console.log(`currently viewing ${tab}`);
//   setActiveTab(tab);
// }, []);
// <div className="navbar-container">
//   <span>This is the navbar</span>
//   <div className="homepage-tab-container">
//     <div className={activeTab === 'books' ? 'active-tab': ''} onClick={() => handleTabClick('books')}>My books</div>
//     <div className={activeTab === 'messages' ? 'active-tab': ''} onClick={() => handleTabClick('messages')}>My messages</div>
//     <div className={activeTab === 'friends' ? 'active-tab': ''} onClick={() => handleTabClick('friends')}>My friends</div>
//     <div className={activeTab === 'notes' ? 'active-tab': ''} onClick={() => handleTabClick('notes')}>My notes</div>
//     <div className={activeTab === 'profile' ? 'active-tab': ''} onClick={() => handleTabClick('profile')}>My profile</div>
//   </div>
// </div>


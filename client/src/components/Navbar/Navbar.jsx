import React, { useCallback, useState, useEffect } from 'react';
import './Navbar.scss';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('book');

  const handleTabClick = useCallback((tab) => {
    console.log(`currently viewing ${tab}`);
    setActiveTab(tab);
  }, []);

  return (
    <div className="navbar-container">
      <span>This is the navbar</span>
      <div className="homepage-tab-container">
        <div className={activeTab === 'books' ? 'active-tab': ''} onClick={() => handleTabClick('books')}>My books</div>
        <div className={activeTab === 'messages' ? 'active-tab': ''} onClick={() => handleTabClick('messages')}>My messages</div>
        <div className={activeTab === 'friends' ? 'active-tab': ''} onClick={() => handleTabClick('friends')}>My friends</div>
        <div className={activeTab === 'notes' ? 'active-tab': ''} onClick={() => handleTabClick('notes')}>My notes</div>
      </div>
    </div>
  );
}



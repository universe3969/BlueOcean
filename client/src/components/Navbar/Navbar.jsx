import React, { useState, useEffect } from 'react';
import Icons from './Icons.jsx';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';

// Navigation tabs title
const tabs = ['Home', 'Books', 'Friends', 'Posts', 'Messages', 'Profile', 'Explore'];

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState('/');
  
  // Whenever current url changes, it should reset the [currentPath] state
  useEffect(() => {
    const onPathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPathChange);

    return () => window.removeEventListener('popstate', onPathChange);
  }, []);

  // All navigation tab should show active state corresponding to url
  const navItems = tabs.map(tab => {
    const path = `/${tab.toLowerCase()}`;
    const onActive = ({ isActive }) => isActive ? 'app__sidebar--active' : null;

    return (
      <div key={ tab }>
        <NavLink to={ path } title={ tab } className={ onActive }>
          { Icons[tab]() }
          <span>{ tab }</span>
        </NavLink>
      </div>
    );  
  });

  return (
    <aside className='app__sidebar'>
      <header>
        <Link to='/home'>
          { Icons.Logo() }
          <h1>TinderBook</h1>
        </Link>
      </header>
      <nav>{ navItems }</nav>
      <footer>
        <section>
          <Link to='/posts'>{ Icons.Add() } Make a Post</Link>
        </section>
        <section>
          { Icons.Settings({ title: 'Settings' }) }
          { Icons.LightMode({ title: 'LightMode' }) }
          { Icons.More({ title: 'More' }) }
        </section>
      </footer>
    </aside>
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


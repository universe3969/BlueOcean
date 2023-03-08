import React, { useState, useEffect } from 'react';
import Icons from './Icons.jsx';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import LogSwitch from '../Login/LogSwitch.jsx'

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
    let path;
    if (tab === 'Profile') {
      path = `/${tab.toLowerCase()}/1`;
    } else {
      path = `/${tab.toLowerCase()}`;
    }
    // const path = `/${tab.toLowerCase()}`;

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
          <LogSwitch/>
        </section>
      </footer>
    </aside>
  );
}

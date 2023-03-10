import React, { useState, useEffect } from 'react';
import Icons from './Icons.jsx';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import LogSwitch from '../Login/LogSwitch.jsx'
import { useUserStore } from "../Store/store.js";

// Navigation tabs title
export default function Navbar() {
  let tabs = ['Home', 'Books', 'Friends', 'Posts', 'Messages', 'Profile', 'Explore'];
  const curId = useUserStore((state) => state.curId);
  const [currentPath, setCurrentPath] = useState('/');
  if(!curId){
    tabs = ['Books']
  }

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
          {curId && <Link to='/edit'>{ Icons.Settings({ title: 'Settings' }) }</Link>}
          { Icons.LightMode({ title: 'LightMode' }) }
          { Icons.More({ title: 'More' }) }
          <LogSwitch/>
        </section>
      </footer>
    </aside>
  );
}

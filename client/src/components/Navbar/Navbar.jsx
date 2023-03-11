import React, { useState, useEffect } from 'react';
import Icons from './Icons.jsx';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import LogSwitch from '../Login/LogSwitch.jsx'
import { useUserStore } from "../Store/store.js";

// Navigation tabs title
export default function Navbar() {
  const curId = useUserStore((state) => state.curId);
  let tabs = curId ? ['Posts', 'Books', 'Messages', 'Profile', 'Explore'] : ['Books'];

  // All navigation tab should show active state corresponding to url
  const navItems = tabs.map(tab => {
    let path = `/${tab.toLowerCase()}`;

    if (tab === 'Books') path += '/hottest';
    if (tab === 'Profile') path += `/${curId}`;

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
          <h1>Scholar.ly</h1>
        </Link>
      </header>
      <nav>{ navItems }</nav>
      <footer>
        <section>
          <Link to='/posts'>{ Icons.Add() } Make a Post</Link>
        </section>
        <section>
          { curId && <Link to='/edit'>{ Icons.Settings({ title: 'Settings' }) }</Link>}
          { Icons.LightMode({ title: 'LightMode' }) }
          { Icons.More({ title: 'More' }) }
          <LogSwitch/>
        </section>
      </footer>
    </aside>
  );
}

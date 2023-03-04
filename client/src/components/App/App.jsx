import React, { useCallback, useState } from 'react';

import Feed from '../Feed/Feed.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import Trending from '../Trending/Trending.jsx';
import SignUp from '../SignUp/SignUp.jsx';

import './App.scss';

export default function App() {
  const [view, setView] = useState('home-page');

  // the router determines which view to rendeer, if the user is logged in it displays the relevant pages, otherwise it displays a splash screen to log in
  const router = useCallback(() => {
    if (view === 'home-page') {
      return (
        <div className="main-container">
          <Navbar />
          <Feed />
          <Trending />
        </div>
      );
    } else if (view === 'sign-up') {
      return <SignUp />
    }
  }, [view]);

  return (
    <>
      {router()}
    </>
  );
}

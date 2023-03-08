import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import Books from '../Books/Books.jsx';
import Friends from '../Friends/Friends.jsx';
import Profile from '../Profile/Profile.jsx';
import Posts from '../Posts/Posts.jsx';
import Messages from '../Messages/Messages.jsx';
import Tinder from '../Tinder/Tinder.jsx';
import Home from '../Home/Home.jsx';
import ErrorPage from '../ErrorPage/ErrorPage.jsx';
import LogSwitch from '../Login/LogSwitch.jsx';
import Calls from '../ExamplePost/Calls.jsx'
import './App.scss';


export default function App() {

  return (
    < >
      <Navbar />
      <Routes>
        <Route path='/' element={ <Books /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/books' element={ <Books /> } />
        <Route path='/friends' element={ <Friends /> } />
        <Route path='/posts' element={ <Posts />} />
        <Route path='/messages' element={ <Messages /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/explore' element={ <Tinder /> } />
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </>
  );

    // const [view, setView] = useState('home-page');

  // the router determines which view to rendeer, if the user is logged in it displays the relevant pages, otherwise it displays a splash screen to log in
  // const router = useCallback(() => {
  //   if (view === 'home-page') {
  //     return (
  //       <div className="main-container">
  //         <Navbar />
  //         <Feed />
  //         <Trending />
  //       </div>
  //     );
  //   } else if (view === 'sign-up') {
  //     return <SignUp />
  //   }
  // }, [view]);
}

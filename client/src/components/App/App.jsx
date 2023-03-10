import React, { useCallback, useState, useEffect } from 'react';
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
import Calls from '../ExamplePost/Calls.jsx';
import Root from '../Root/Root.jsx';
import EditProfile from '../EditProfile/EditProfile.jsx'
import './App.scss';
import { useUserStore } from "../Store/store.js";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

export default function App() {
  const toggleId = useUserStore((state) => state.toggleId);
  const curId = useUserStore((state) => state.curId);
  const {getAccessTokenSilently} = useAuth0();
  const user = useAuth0().user;
  const email = user?.email
  async function call() {
    if(!email) return
    const token = await getAccessTokenSilently();
    axios.get("http://localhost:3000/users/id", {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        id: email
      }
    })
    .then(data => toggleId(data.data.id))
  }

  useEffect(() => {
    call()
  }, [email])


  return (
    <>
      <Routes>
        <Route path='/' element={ null } />
        <Route path='*' element={ <Navbar /> } />
      </Routes>
      <Routes>
        <Route path='/'>
          <Route index element={ <Root /> } />
          <Route path='books/*' element={ <Books /> } />
          <Route path='posts' element={ <Posts />} />
          <Route path='messages' element={ <Messages /> } />
          <Route path='profile/:id' element={ <Profile /> } />
          <Route path='explore' element={ <Tinder /> } />
          <Route path='edit' element={<EditProfile />} />
          <Route path='*' element={ <ErrorPage /> } />
        </Route>
      </Routes>
    </>
  );
}


import React from 'react';
import LogSwitch from '../Login/LogSwitch.jsx'
import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <>
    <LogSwitch/>
    <Link to='/books'>
      <p>See the Books</p>
    </Link>
    </>
  )
}

export default Root
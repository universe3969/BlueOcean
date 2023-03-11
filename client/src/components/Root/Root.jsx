import React from 'react';
import LogSwitch from '../Login/LogSwitch.jsx'
import { Link } from 'react-router-dom';
import './Root.scss';
const Root = () => {
  return (
      <div className='page'>
        <div className='options' >
          <div className='btn'>
            <LogSwitch/>
          </div>
          {/* <div>
              Or...
            </div> */}
          <div className='see-books'>
          <Link to='/books'>
            <button className='buttan'>Search Books as Guest</button>
          </Link>
          </div>
        </div>
      </div>
  )
}
export default Root
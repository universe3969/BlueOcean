import React, { useState, useEffect } from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';

// Right now this search bar is functionless, refactor later
export default function BookSearchBar() {
  
  return (
    <div className='app__books__search'>
      <SearchIcon />
      <input type='search' placeholder='Search Book by Title...' />
    </div>
  );
}

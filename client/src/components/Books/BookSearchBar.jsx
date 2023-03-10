import React, { useRef, useState, useEffect } from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Right now this search bar is functionless, refactor later
//
export default function BookSearchBar() {
  const [bookName, setBookName] = useState('');
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.onfocus = () => setShowSearch(true);

    function blurInput(event) {
      if (!event.target.closest('.app__books__search')) {
        setShowSearch(false);
      }
    } 
    
    window.addEventListener('click', blurInput);

    return () => window.removeEventListener('click', blurInput);
  }, []);

  async function searchBookByName(bookName) {
    if (bookName === '') {
      setResults([]);
      return;
    }

    const res = await fetch(`http://localhost:3000/api/books/title/${bookName}`);
    const json = await res.json();

    setResults(json);
  }

  const inputProps = {
    type: 'search',
    placeholder: 'Search Book by Title...',
    value: bookName,
    onChange(event) {
      setBookName(event.target.value);
      if (event.target.value === '') setResults([]);
      else timerRef.current = setTimeout(() => searchBookByName(bookName), 300);
    },
    ref: inputRef
  };

  const resultCards = results.map(({ id, title, author, cover_image }) => {
    return (
      <Link key={ id } to={ `/books/id/${id}` } >
        <article>
          <img src={ cover_image} />
          <div>
            <h3>{ title }</h3>
            <p>{ author }</p>
          </div>
        </article>
      </Link>
    );
  });

  const searchDropDown = (
    <div className='app__books__search__dropdown'>
      { resultCards }
    </div>
  );

  return (
    <div className='app__books__search'>
      <SearchIcon />
      <input { ...inputProps } />
      { showSearch ? searchDropDown : null }
    </div>
  );
}

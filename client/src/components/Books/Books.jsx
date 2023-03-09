import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import BookCard from './BookCard.jsx';
import BookDetail from './BookDetail.jsx';
import BookQuote from './BookQuote.jsx';
import BookSearchBar from './BookSearchBar.jsx';
import './Books.scss';

// Considering when user searching for a book, but that book does not exist
// So user should be able to add a book if not exist, however he need to be login
export default function Books() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    // didn't handle error right now, refactor later
    async function updateBooks() {
      const res = await fetch(`http://localhost:3000/api/books`);
      const json = await res.json();
      setAllBooks([...allBooks, ...json]);
    }

    updateBooks();
  }, []);

  const bookList = allBooks.map(bookInfo => (<BookCard { ...bookInfo } />));
  const bookTabs = ['Hottest', 'Lattest', 'Saved'].map(tabTitle => {
    const props = {
      to: `/books/${tabTitle.toLowerCase()}`,
      className: ({ isActive }) => isActive ? 'app__books__nav--active' : null,
      key: tabTitle
    };

    return <li><NavLink { ...props }>{ tabTitle }</NavLink></li>;
  });

  return (
    <main className='app__books'>
      <section className='app__books__main'>
        <nav className='app__books__nav'>
          <BookSearchBar />
          <ul>{ bookTabs }</ul>
        </nav>
        <div className='app__books__card-container'>
          { bookList }
        </div>
      </section>
      {/* 
        When not in detail mode, this section should show quotes from books
        This feature could be implemented later if have time
        Quote component should be simple, but able to relink to the book
        Maybe considering having a quotation 
      */}
      <section className='app__books__sub'>
        <Routes>
          <Route path='id/:id' element={ <BookDetail /> } />
          <Route path=':tag' element={ <BookQuote />} />
        </Routes>
      </section>
    </main>
  );
}

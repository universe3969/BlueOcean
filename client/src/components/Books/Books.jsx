import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import BookCard from './BookCard.jsx';
import BookDetail from './BookDetail.jsx';
import BookSearchBar from './BookSearchBar.jsx';
import { useUserStore } from '../Store/store.js';
import './Books.scss';

// Considering when user searching for a book, but that book does not exist
// So user should be able to add a book if not exist, however he need to be login
export default function Books() {
  const [currentTab, setCurrentTab] = useState('Hottest');
  const [allBooks, setAllBooks] = useState([]);
  const { curId } = useUserStore();

  useEffect(() => {
    // didn't handle error right now, refactor later
    async function updateBooksByTab(tabTitle) {
      let url = 'http://localhost:3000/api/books';

      if (tabTitle === 'Liked') {
        url += `/user/${curId || -1}`; //this is hard-coded, subject to change later
      } else {
        url += `?sort=${tabTitle === 'Hottest' ? 'reviews' : 'date'}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      setAllBooks(json);
    }

    updateBooksByTab(currentTab);
  }, [currentTab]);

  const bookList = allBooks.map(bookInfo => (<BookCard { ...bookInfo } />));
  const options = curId ? ['Hottest', 'Lattest', 'Liked'] : ['Hottest', 'Lattest'];
  const bookTabs = options.map(tabTitle => {
    const props = {
      to: `/books/${tabTitle.toLowerCase()}`,
      className: ({ isActive }) => isActive ? 'app__books__nav--active' : null,
      key: tabTitle,
      onClick: () => setCurrentTab(tabTitle)
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
          <Route path=':tag' element={ <BookDetail bookId={ allBooks[0]?.id } />} />
        </Routes>
      </section>
    </main>
  );
}

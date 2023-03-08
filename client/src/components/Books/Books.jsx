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


  return (
    <main className='app__books'>
      <section className='app__books__main'>
        
      </section>
      {/* 
        When not in detail mode, this section should show quotes from books
        This feature could be implemented later if have time
        Quote component should be simple, but able to relink to the book
        Maybe considering having a quotation 
      */}
      <section className='app__books__sub'>
        
      </section>
    </main>
  );
}

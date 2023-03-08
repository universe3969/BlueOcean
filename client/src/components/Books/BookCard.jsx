import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; 

export default function BookCard({ id, title, author, cover_image }) {

  return (
    <article className='book__card'>
      <img src={ cover_image } alt={ `book cover of ${title}` } />
      <section>
        <div className='book__card__text'>
          <NavLink to={ `/books/id/${id}` }>
            <span>{ title }</span>
          </NavLink>
          <span>{ author }</span>
        </div>
        <div className='book__card__buttons'>
          <NavLink to={ `/books/id/${id}` }>
            <span>
          </NavLink>
          <button>
            Add Review
          </button>
        </div>
      </section>
    </article>
  );
}

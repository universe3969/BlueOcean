import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; 

export default function BookCard({ id, title, author, cover_image }) {

  return (
    <article className='book__card' key={ id }>
      <NavLink to={ `/books/id/${id}` } className='book__card__cover'>
        <img src={ cover_image } alt={ `book cover of ${title}` } />
      </NavLink>
      <section>
        <div className='book__card__text'>
          <NavLink to={ `/books/id/${id}` }>
            <h3 className='book__card__text__title'>{ title }</h3>
          </NavLink>
          <p className='book__card__text__author'>By { author }</p>
        </div>
        <div className='book__card__buttons'>
          <NavLink to={ `/books/id/${id}` }>
            <span>Read More</span>
          </NavLink>
          <NavLink to='/posts' >
            <span>Add Review</span>
          </NavLink>
        </div>
      </section>
    </article>
  );
}

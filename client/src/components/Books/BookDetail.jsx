import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetail({ bookId }) {
  const id = bookId || useParams().id;
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    async function updateBookInfo() {
      const res = await fetch(`http://localhost:3000/api/books/id/${id}`);
      const json = await res.json();

      setBookInfo(json);
    }

    updateBookInfo();
  }, [id]);

  if (!bookInfo) {
    return <p>Not Ready Yet</p>;    
  }

  const { 
    cover_image, title, author, description, genres,
    publish_date, price, availablity, page_count,
  } = bookInfo;

  // right now this genre is not clickable, refactor later
  const genreList = (
    <div className='book__detail__genres'>
      {
        genres.map(({ genre_id, genre }) => {
          return <div key={ genre_id }>{ genre }</div>;
        })
      }
    </div>
  );

  return (
    <div className='book__detail'>
      <img src={ cover_image } />
      <h1 className='book__detail__title'>{ title }</h1>
      <p className='book__detail__author'>{ author }</p>
      <p className='book__detail__description'>{ description }</p>
      { genreList }
      <table>
        <tr>
          <th>Page Count</th>
          <td>{ page_count || 'N/A' }</td>
        </tr>
        <tr>
          <th>Publish Date</th>
          <td>{ publish_date ? (new Date(publish_date)).toLocaleDateString() : 'N/A' }</td>
        </tr>
        <tr>
          <th>Default Price</th>
          <td>{ price ? '$' + price : 'N/A' }</td>
        </tr>
        <tr>
          <th>Availability</th>
          <td>{ availablity ? 'Yes' : 'No' }</td>
        </tr>
      </table>
      <div className='book__detail__CTA'>
        <Link to='/posts' className='book__detail__CTA'>
          Add a Review
        </Link>
        <button className='book__detail__CTA'>
          Save
        </button>
      </div>
    </div>
  )  
}

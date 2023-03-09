import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';


// Don't change this <main> wrapper, this tag is used in App.scss
export default function ErrorPage() {
  return (
    <main>
      Sorry, Page Not Found!!!
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
    </main>
  );
}

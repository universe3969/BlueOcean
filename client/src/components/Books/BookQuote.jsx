import React, { useState, useEffect } from 'react';

// This component is right now a placeholder, could be a dynamic from database
export default function BookQuote() {
  return (
    <div className='book__quote'>
      <h1>Quote of the Day</h1>
      <p>No amount of fire or freshness can challenge what a man will store up in his ghostly heart.</p>
      <p>By F.Scott Fitzgerald</p>
      <a>The Great Gatsby</a>
    </div>
  );
}

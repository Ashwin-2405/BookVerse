import React from 'react';

export default function Result({ book, openDetail }) {
  const info = book.volumeInfo;

  return (
    <div className="result-card" onClick={() => openDetail(book)}>
      <img
        src={info.imageLinks?.thumbnail || '/no-cover.png'}
        alt={info.title}
      />
      <div className="book-info">
        <h3>{info.title}</h3>
        <p>{info.authors?.join(', ')}</p>
      </div>
    </div>
  );
}

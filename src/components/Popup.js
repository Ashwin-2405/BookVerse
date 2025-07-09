import React from 'react';

export default function Popup({ book, closePopup }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={closePopup}>✖</button>
        <h2>{book.title}</h2>
        <p><strong>Authors:</strong> {book.authors?.join(', ')}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Published:</strong> {book.publishedDate}</p>
        <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
      </div>
    </div>
  );
}

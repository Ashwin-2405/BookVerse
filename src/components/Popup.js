// src/components/Popup.js
import React, { useEffect } from "react";
import "./Popup.css";

export default function Popup({ book, closePopup }) {
  const handleOutsideClick = (e) => {
    if (e.target.className === "popup-overlay") {
      closePopup();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // prevent scroll behind popup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="popup-overlay" onClick={handleOutsideClick}>
      <div className="popup-content">
        <button className="popup-close" onClick={closePopup}>✖</button>
        <h2>{book.title}</h2>
        <p><strong>Authors:</strong> {book.authors?.join(", ")}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Published:</strong> {book.publishedDate}</p>
        <p><strong>Description:</strong></p>
        <p>
  {book.description
    ? book.description.slice(0, 300) + (book.description.length > 300 ? '...' : '')
    : 'No description available.'}
     </p>
      </div>
    </div>
  );
}

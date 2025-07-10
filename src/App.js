import React, { useState } from "react";
import axios from "axios";
import Popup from "./components/Popup";
import "./styles/App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [searchBy, setSearchBy] = useState("intitle");
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async () => {
    if (!query) return;

    const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchBy}:${query}&key=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const openBook = (book) => {
    setSelectedBook(book.volumeInfo);
  };

  const closePopup = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <h1>BookVerse</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
        />
        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="intitle">Title</option>
          <option value="inauthor">Author</option>
          <option value="isbn">ISBN</option>
        </select>
        <button onClick={searchBooks}>Search</button>
      </div>

      <div className="books">
        {books.map((book) => {
          const volume = book.volumeInfo;
          return (
            <div className="book" key={book.id} onClick={() => openBook(book)}>
              <img
                src={
                  volume.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/150x200?text=No+Image"
                }
                alt={volume.title}
              />
              <h3>{volume.title}</h3>
              <p>{volume.authors?.join(", ")}</p>
            </div>
          );
        })}
      </div>

      {selectedBook && <Popup book={selectedBook} closePopup={closePopup} />}
    </div>
  );
}

export default App;

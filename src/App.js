import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Result from './components/Result';
import Popup from './components/Popup';

function App() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('intitle');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const RESULTS_PER_PAGE = 12;
  const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
      const categoryQuery = category ? `+subject:${category}` : '';
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchType}:${query}${categoryQuery}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}&key=${API_KEY}`
      );
      setResults(res.data.items || []);
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      searchBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const openDetail = (book) => {
    setSelected(book.volumeInfo);
  };

  const closePopup = () => {
    setSelected(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>BookVerse</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      <Search
        query={query}
        setQuery={setQuery}
        searchBooks={(e) => {
          setCurrentPage(1); // Reset to first page on new search
          searchBooks(e);
        }}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      <div className="category-filter">
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Business">Business</option>
          <option value="Technology">Technology</option>
          <option value="Self-help">Self-help</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
      </div>

      <div className="results">
        {results.map((book, i) => (
          <Result key={i} book={book} openDetail={openDetail} />
        ))}
      </div>

      {results.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      )}

      {selected && <Popup book={selected} closePopup={closePopup} />}
    </div>
  );
}

export default App;

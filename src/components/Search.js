import React from 'react';

export default function Search({ query, setQuery, searchBooks, searchType, setSearchType }) {
  return (
    <form className="search-box" onSubmit={searchBooks}>
      <input
        type="text"
        placeholder={`Search by ${searchType.toLowerCase()}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="intitle">Title</option>
        <option value="inauthor">Author</option>
        <option value="isbn">ISBN</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

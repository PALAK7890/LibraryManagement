import { useEffect, useState } from "react";
import "./style/e_book.css";

export default function EbookLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState(""); // search
  const [filtered, setFiltered] = useState([]);

  // ⭐ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  useEffect(() => {
    setLoading(true);

    fetch(`https://openlibrary.org/subjects/fantasy.json?limit=200`)
      .then((res) => res.json())
      .then((data) => {
        const processed = (data.works || []).map((book) => ({
          ...book,
          price: (Math.random() * 400 + 100).toFixed(0) + "₹",
          rent: (Math.random() * 40 + 10).toFixed(0) + "₹ / week",
          free: Math.random() < 0.4,
        }));

        setBooks(processed);
        setFiltered(processed);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setLoading(false);
      });
  }, []);

  // ⭐ SEARCH FILTER
  useEffect(() => {
    const searchLower = query.toLowerCase();

    const results = books.filter((book) => {
      return (
        book.title?.toLowerCase().includes(searchLower) ||
        book.authors?.[0]?.name?.toLowerCase().includes(searchLower)
      );
    });

    setFiltered(results);
    setCurrentPage(1);
  }, [query, books]);


  // ⭐ PAGINATION LOGIC
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / booksPerPage);


  return (
    <div className="elib-container">
      <h1>📘 E-Books Library</h1>
      <p className="sub">Browse all books, search instantly and read online.</p>

      {/* SEARCH BAR */}
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="loader"></div>}

      {!loading && (
        <>
          {/* BOOK GRID */}
          <div className="elib-grid">
            {currentBooks.length === 0 && (
              <p className="no-books">No Books Found 😕</p>
            )}

            {currentBooks.map((book) => (
              <div key={book.key} className="elib-book">
                <div className="book-img-wrapper">
                  <img
                    src={
                      book.cover_id
                        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                        : "https://via.placeholder.com/150"
                    }
                    alt={book.title}
                  />
                  <span className={book.free ? "badge free" : "badge premium"}>
                    {book.free ? "FREE" : "PREMIUM"}
                  </span>
                </div>

                <h3>{book.title.slice(0, 35)}...</h3>
                <p className="author">
                  {book.authors?.[0]?.name || "Unknown Author"}
                </p>

                <div className="pricing-box">
                  {book.free ? (
                    <button
                      className="read-btn"
                      onClick={() =>
                        window.open(`https://openlibrary.org${book.key}`, "_blank")
                      }
                    >
                      Read Free
                    </button>
                  ) : (
                    <>
                      <p className="price">Buy: {book.price}</p>
                      <p className="rent">Rent: {book.rent}</p>

                      <div className="cta-box">
                        <button className="rent-btn">Rent</button>
                        <button className="buy-btn">Buy</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ⭐ PAGINATION CONTROLS */}
          <div className="pagination-box">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ⬅ Prev
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}

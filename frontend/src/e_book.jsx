import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style/e_book.css";

export default function EbookLibrary() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);   // 🟢 Loader state added

  useEffect(() => {
    setLoading(true); // new category par again loader on

    fetch(`https://openlibrary.org/subjects/${category}.json?limit=30`)
      .then(res => res.json())
      .then(data => {
        const processed = (data.works || []).map(book => ({
          ...book,
          price: (Math.random() * 400 + 100).toFixed(0) + "₹",
          rent: (Math.random() * 40 + 10).toFixed(0) + "₹ / week",
          free: Math.random() < 0.4
        }));
        setBooks(processed);
        setLoading(false);  // 🔥 stop loader after fetch
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="elib-container">

      <h1>📘 {category.toUpperCase()} Books</h1>
      <p className="sub">Explore, Read, Rent & Buy instantly.</p>

      {/* 🔥 SHOW LOADER WHILE FETCHING */}
      {loading && <div className="loader"></div>}

      {/* Only show books if data loaded */}
      {!loading && (
        <div className="elib-grid">
          {books.length === 0 && <p className="no-books">No Books Found 😕</p>}

          {books.map(book => (
            <div key={book.key} className="elib-book">
              <div className="book-img-wrapper">
                <img
                  src={book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                                     : "https://via.placeholder.com/150"}
                  alt={book.title}
                />
                <span className={book.free ? "badge free" : "badge premium"}>
                  {book.free ? "FREE" : "PREMIUM"}
                </span>
              </div>

              <h3>{book.title.slice(0,30)}...</h3>
              <p className="author">{book.authors?.[0]?.name}</p>

              <div className="pricing-box">
                {book.free ? (
                  <button className="read-btn"
                          onClick={() => window.open(`https://openlibrary.org${book.key}`,'_blank')}>
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
      )}
    </div>
  );
}

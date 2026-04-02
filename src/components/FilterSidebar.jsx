export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  clearFilters,
}) {
  const ratingOptions = [4, 3, 2, 1];

  return (
    <aside className="filters">
      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-group">
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-divider" />

      <div className="filter-section">
        <h3 className="filter-title">Price Range</h3>
        <div className="price-range-row">
          <input
            type="number"
            inputMode="numeric"
            placeholder="$ Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
          />
          <span className="price-separator">-</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="$ Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      <div className="filter-divider" />

      <div className="filter-section">
        <h3 className="filter-title">Minimum Rating</h3>

        <div className="rating-filter-list" role="radiogroup" aria-label="Minimum Rating">
          {ratingOptions.map((rating) => {
            const isSelected = minRating === rating;
            return (
              <label key={rating} className="rating-option-row">
                <input
                  type="radio"
                  name="min-rating"
                  checked={isSelected}
                  onChange={() => setMinRating(rating)}
                />
                <span className="custom-radio" aria-hidden="true" />
                <span className="rating-option-stars">
                  {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </span>
                <span className="rating-option-text">&amp; Up</span>
              </label>
            );
          })}

          <label className="rating-option-row all-rating-row">
            <input
              type="radio"
              name="min-rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
            />
            <span className="custom-radio" aria-hidden="true" />
            <span className="rating-option-text">All Ratings</span>
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button className="secondary-btn clear-filter-btn" onClick={clearFilters}>Clear Filters</button>
      </div>
    </aside>
  );
}

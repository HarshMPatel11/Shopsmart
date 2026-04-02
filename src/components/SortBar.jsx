export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="sort-bar">
      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
}

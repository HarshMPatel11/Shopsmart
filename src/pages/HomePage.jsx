import { useEffect, useMemo, useState, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../api/products';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import SortBar from '../components/SortBar';
import ProductGrid from '../components/ProductGrid';
import InfiniteLoader from '../components/InfiniteLoader';
import useDebounce from '../hooks/useDebounce';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getVisibleItems } from '../utils/helpers';

const PAGE_SIZE = 8;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setSearch('');
    setSortBy('featured');
    setVisibleCount(PAGE_SIZE);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (minPrice !== '') {
      result = result.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice !== '') {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    if (minRating > 0) {
      result = result.filter((product) => (product.rating?.rate || 0) >= minRating);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  const visibleProducts = useMemo(
    () => getVisibleItems(filteredProducts, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const loaderRef = useInfiniteScroll(loadMore, hasMore, loading);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  return (
    <div className="page-layout">
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minRating={minRating}
        setMinRating={setMinRating}
        clearFilters={clearFilters}
      />

      <section className="content-area">
        <div className="toolbar">
          <SearchBar search={search} setSearch={setSearch} />
          <SortBar sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <ProductGrid products={visibleProducts} loading={loading} />

        {!loading && filteredProducts.length > 0 && (
          <InfiniteLoader innerRef={loaderRef} hasMore={hasMore} />
        )}
      </section>
    </div>
  );
}

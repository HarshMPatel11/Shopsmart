import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import StarRating from './StarRating';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div className="product-card">
      <button
        className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
      >
        ♥
      </button>

      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} className="product-image" />
        <h3 className="product-title">{product.title}</h3>
      </Link>

      <p className="product-category">{product.category}</p>
      <StarRating rate={product.rating?.rate} />
      <p className="product-price">{formatPrice(product.price)}</p>

      <button className="primary-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default memo(ProductCard);

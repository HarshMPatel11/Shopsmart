import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import StarRating from '../components/StarRating';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="details-page">
      <div className="details-image-wrap">
        <img src={product.image} alt={product.title} className="details-image" />
      </div>

      <div className="details-content">
        <p className="details-category">{product.category}</p>
        <h1>{product.title}</h1>
        <StarRating rate={product.rating?.rate} />
        <p className="details-price">{formatPrice(product.price)}</p>
        <p className="details-description">{product.description}</p>

        <div className="details-actions">
          <button className="primary-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button
            className={`secondary-btn ${isWishlisted(product.id) ? 'active-wishlist' : ''}`}
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

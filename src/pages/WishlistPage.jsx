import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="simple-page">
      <h1>Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="list-page wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="list-card wishlist-card">
              <div className="wishlist-media-wrap">
                <img src={item.image} alt={item.title} className="wishlist-image" />
              </div>

              <div className="list-card-content wishlist-content">
                <h3 className="wishlist-title">{item.title}</h3>
                <p className="wishlist-price">{formatPrice(item.price)}</p>
              </div>

              <div className="action-column wishlist-actions">
                <button className="primary-btn wishlist-add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
                <button className="secondary-btn wishlist-remove-btn" onClick={() => toggleWishlist(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

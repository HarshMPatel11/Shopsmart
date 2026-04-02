import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Your Cart</h3>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart drawer">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <p className="drawer-empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="drawer-item">
                <img src={item.image} alt={item.title} />
                <div className="drawer-item-content">
                  <h4 className="drawer-item-title">{item.title}</h4>
                  <p className="drawer-item-price">{formatPrice(item.price)}</p>
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 'dec')}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 'inc')}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <strong className="drawer-total">Total: {formatPrice(cartTotal)}</strong>
          <Link to="/cart" className="primary-btn drawer-cta" onClick={onClose}>Go to Cart</Link>
        </div>
      </div>
    </div>
  );
}

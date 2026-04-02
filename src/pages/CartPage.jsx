import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="simple-page">
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="list-page cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="list-card cart-item-card">
                <div className="cart-media-wrap">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                </div>

                <div className="list-card-content cart-item-content">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 'dec')}>
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 'inc')}>
                      +
                    </button>
                  </div>
                </div>

                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="summary-box cart-summary">
            <div className="cart-total-wrap">
              <p className="cart-total-label">Order Total</p>
              <h3 className="cart-total-value">{formatPrice(cartTotal)}</h3>
              <p className="cart-summary-note">Secure checkout in the next step</p>
            </div>

            <div className="cart-summary-actions">
              <button className="primary-btn cart-checkout-btn">Proceed to Checkout</button>
              <button className="secondary-btn cart-clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

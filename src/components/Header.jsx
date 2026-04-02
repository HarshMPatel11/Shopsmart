import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ onOpenCart }) {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">ShopSmart</Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-home-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
        </nav>

        <div className="header-actions">
          <NavLink to="/wishlist" className="icon-action" aria-label="Wishlist">
            <span className="icon-symbol">♡</span>
            <span className="icon-badge">{wishlistItems.length}</span>
          </NavLink>
          <button className="icon-action" onClick={onOpenCart} aria-label="Open cart">
            <span className="icon-symbol">🛒</span>
            <span className="icon-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

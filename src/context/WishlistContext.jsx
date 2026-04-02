import { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useLocalStorage('wishlist_items', []);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, [setWishlistItems]);

  const isWishlisted = useCallback(
    (id) => wishlistItems.some((item) => item.id === id),
    [wishlistItems]
  );

  const value = useMemo(() => ({
    wishlistItems,
    toggleWishlist,
    isWishlisted,
  }), [wishlistItems, toggleWishlist, isWishlisted]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}

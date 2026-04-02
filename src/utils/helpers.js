export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function getVisibleItems(items, count) {
  return items.slice(0, count);
}

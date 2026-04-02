export default function StarRating({ rate }) {
  const fullStars = Math.round(rate || 0);
  return (
    <div className="rating-stars">
      {'★'.repeat(fullStars)}{'☆'.repeat(5 - fullStars)}
    </div>
  );
}

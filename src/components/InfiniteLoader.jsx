export default function InfiniteLoader({ innerRef, hasMore }) {
  return (
    <div ref={innerRef} className="infinite-loader">
      {hasMore ? 'Loading more products...' : 'No more products'}
    </div>
  );
}

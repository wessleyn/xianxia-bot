import BookmarkCardSkeleton from './components/BookmarkCard/skeleton';
import BookMarkHeaderSkeleton from './components/BookmarkHeader/skeleton';

const BookMarksSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <BookMarkHeaderSkeleton />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <BookmarkCardSkeleton key={`bookmark-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default BookMarksSkeleton
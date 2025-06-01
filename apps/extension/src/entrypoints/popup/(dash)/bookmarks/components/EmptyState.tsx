import EmptyState from "../../../components/EmptyState";

const BookmarksEmptyState = () => {
    return (
        <EmptyState
            title="No bookmarks yet"
            description="Save your favorite chapters to access them quickly here"
            actionLabel="Explore Novels"
            actionPath="/current"
        />
    );
};

export default BookmarksEmptyState;
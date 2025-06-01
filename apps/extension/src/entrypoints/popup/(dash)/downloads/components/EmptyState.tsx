import EmptyState from "../../../components/EmptyState";

const DownloadsEmptyState = () => {
  return (
    <EmptyState
      title="No downloaded novels"
      description="Download novels to read them offline anytime"
      actionLabel="Browse Library"
      actionPath="/current"
    />
  );
};

export default DownloadsEmptyState;
